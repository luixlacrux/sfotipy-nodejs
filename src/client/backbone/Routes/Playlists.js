import Backbone from 'backbone'
import $ from 'jquery'
// Collections
import PlaylistCollection from 'src/client/backbone/Collections/Playlists'
// Models
import PlaylistModel from 'src/client/backbone/Models/Playlist'
import SongModel from 'src/client/backbone/Models/Song'
// Views
import MainPlayList from 'src/client/backbone/Views/LibraryMin/index'
import PlaylistView from 'src/client/backbone/Views/LibraryMin/Playlist'

export function Main () {
  let main = new MainPlayList()
  main.render()
  main.show()
  GetPlaylist()
}

export function GetPlaylist () {
  const playlist = new PlaylistCollection({ url: `/api/playlist/` })

  // Mostrar todas las listas de reproducciones
  playlist.getPlaylists().then(() => {
    let view = new PlaylistView({ collection: playlist })
    view.render()
  })
}

export function NewPlaylist (title) {
  const playlistModel = new PlaylistModel({ url: `/api/playlist/` })
  playlistModel.newPlaylist(title).then(() => {
    GetPlaylist()
  })
}

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
