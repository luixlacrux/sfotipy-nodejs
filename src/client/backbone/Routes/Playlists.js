import Backbone from 'backbone'
import $ from 'jquery'
// imports templates
import loader from 'src/client/handlebars/Utils/loader.hbs'
// Collections
import PlaylistCollection from 'src/client/backbone/Collections/Playlists'
import SongsCollection from 'src/client/backbone/Collections/Songs'
// Models
import PlaylistModel from 'src/client/backbone/Models/Playlist'
import SongModel from 'src/client/backbone/Models/Song'
// Views
import MainPlayList from 'src/client/backbone/Views/LibraryMin/index'
import PlaylistLibraryView from 'src/client/backbone/Views/LibraryMin/Playlist'
import PlaylistView from 'src/client/backbone/Views/Playlist/main.js'
import ListSongView from 'src/client/backbone/Views/Playlist/list'

// function main
export function Main () {
  let main = new MainPlayList()
  main.render()
  main.show()
  GetPlaylist()
}
// get all playlists
export function GetPlaylist () {
  const playlist = new PlaylistCollection({ url: `/api/playlist/` })

  // Mostrar todas las listas de reproducciones
  playlist.getPlaylists().then(() => {
    let view = new PlaylistLibraryView({ collection: playlist })
    view.render()
  })
}
// Creates a new playlist
export function NewPlaylist (title) {
  const playlistModel = new PlaylistModel({ url: `/api/playlist/` })
  playlistModel.newPlaylist(title).then(() => {
    GetPlaylist()
  })
}
// saves song in a playlist
export function AddSong (playlist, song) {
  song = {
    id: song.id,
    name: song.name,
    song: song.source,
    duration: song.duration_ms,
    cover: song.cover,
    id_album: song.album_id,
    album: song.album,
    id_artist: song.artists[0].id,
    artist: song.artists[0].name
  }
  const modelSong = new SongModel({ url: `/api/song/` })
  modelSong.addSongToPlaylist(playlist, song).then(() => {
    console.log(`${song.name} saved in ${playlist.title}`)
    // Ocultar la vista de playlist
    let main = new MainPlayList()
    main.hide()
  })
}

// show detail of the playlist
export async function ViewPlaylist (id) {
  // Hide Player and show spinnet
  const $app = $('#app')
  const $player = $('#player')

  $player.hide()
  $app.html(loader({ big: true }))

  // models and colleccions
  const songs = new SongsCollection()
  const modelPlaylist = new PlaylistModel()
  const data = await getData(id)
  // renderings
  modelPlaylist.getPlaylist(data.playlist)
  let playlistView = new PlaylistView({ model: modelPlaylist })
  playlistView.render()
  // renderings songs
  songs.addSongs(data)
  const list = new ListSongView({ collection: songs })
  list.render()
}

// function async for get data
async function getData (id) {
  const url = `/api/playlist/${id}`
  const data = await $.get(url)
  return data
}
