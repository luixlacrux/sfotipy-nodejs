import Backbone from 'backbone'
import $ from 'jquery'
import loader from 'src/client/handlebars/Utils/loader.hbs'
// Views
import AlbumView from 'src/client/backbone/Views/Album/main'
import ListSongView from 'src/client/backbone/Views/Album/list'
// Model
import AlbumModel from 'src/client/backbone/Models/Album'
// Collection
import SongsCollection from 'src/client/backbone/Collections/Songs'
import { albumsChecker } from 'src/client/backbone/Routes/Checker'


export default async function (id) {
  const $app = $('#app')
  const $player = $('#player')

  $player.hide()
  $app.html(loader({ big: true }))

  await render($app, id)
  albumsChecker()
}

async function render ($app, id) {
  const albumModel = new AlbumModel({ url: `/api/album/${id}` })
  const songs = new SongsCollection()
  
  return new Promise((resolve, reject) => {
    albumModel.fetchData(id).then(() => {
      const albumView = new AlbumView({ model: albumModel })
      albumView.render()
      // Agregar las canciones a la colleccion
      songs.addSongs(albumModel)
      const list = new ListSongView({ collection: songs })
      list.render()
      return resolve()
    })
  })
}
