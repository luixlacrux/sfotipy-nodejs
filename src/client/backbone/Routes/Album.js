import Backbone from 'backbone'
import $ from 'jquery'
// Views
import AlbumView from 'src/client/backbone/Views/Album/main'
import ListSongView from 'src/client/backbone/Views/Album/list'
// Model
import AlbumModel from 'src/client/backbone/Models/Album'
// Collection
import SongsCollection from 'src/client/backbone/Collections/Songs'


export default function (id) {
  const $app = $('#app')
  const $player = $('#player')
  const albumModel = new AlbumModel({ url: `/api/album/${id}` })
  const songs = new SongsCollection()

  $player.hide()
  $app.empty()
  $app.html('<div class="loader fixed"><div>')

  albumModel.fetchData(id).then(() => {
    const albumView = new AlbumView({ model: albumModel })
    albumView.render()
    // Agregar las canciones a la colleccion
    songs.addSongs(albumModel)
    const list = new ListSongView({ collection: songs })
    list.render()
  })
}
