import Backbone from 'backbone'
import $ from 'jquery'
// Collections
import PlaylistCollection from 'src/client/backbone/Collections/Playlists'
// Models
import PlaylistModel from 'src/client/backbone/Models/Playlist'
// Views
import MainPlayList from 'src/client/backbone/Views/Library/index'
import PlaylistView from 'src/client/backbone/Views/Library/Playlist'

export function GetPlaylist () {
  const $app = $('.Share')
  const playlist = new PlaylistCollection({ url: `/api/playlist/` })

  $app.css('right', '0')
  let main = new MainPlayList()
  main.render()

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
