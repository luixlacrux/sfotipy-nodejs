import Backbone from 'backbone'
import $ from 'jquery'
import loaderBig from 'src/client/handlebars/Utils/loader.hbs'
import AlbumsCollections from 'src/client/backbone/Colecciones/Albums'
import TopAlbumsView from 'src/client/backbone/Vistas/TopAlbums/Albums'

export default function () {
  const $app = $('#app')
  const $player = $('#player')
  const albums = new AlbumsCollections({ url: '/api/top-albums' })
  
  // ocultamos player
  $player.hide()

  // colocamos el loader
  $app.html(loaderBig())

  // escuchamos cada vez que se agregan datos 
  // albums.on('add', () => console.log('Se agrego un modelo a la coleccion'))

  // obtenemos los datos
  albums.getAlbums().then(() => {
    // instanciamos una nueva vista con los datos de la colleccion
    let view = new TopAlbumsView({ collection: albums })
    view.render()

    // agregamos los datos al html de $app
    $app.html(view.el)
  }).catch(err => console.log(err))
}