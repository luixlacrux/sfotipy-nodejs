import Backbone from 'backbone'
import $ from 'jquery'
/* Views */
import HeaderView from 'src/client/backbone/Vistas/Header/Main'
/* Routes */
import PlayRoute from 'src/client/backbone/Rutas/Play'
import TopAlbumsRoute from 'src/client/backbone/Rutas/TopAlbums'

class Router extends Backbone.Router {
  get routes () {
    return {
      'top-albums': 'TopAlbumsRoute',
      'play/:album/:id': 'PlayRoute',
      '*notFound': 'notFound',
    }
  }

  init () {
    // Instancio la vista header
    this.headerView = new HeaderView()
    Backbone.history.start({ root: '/', pushState: true })
  }

  // retornara un 404 Not Found
  notFound () { console.error('Not Found') }

  // Funcion que se ejecutara cada vez que una ruta haga match
  execute (callback, args, name) {
    console.log('Match Route')
    if (callback) callback.apply(this, args)
  }

  TopAlbumsRoute () {
    this.headerView.setTitle('Top Albums')
    return TopAlbumsRoute()
  }

  PlayRoute (album, id) {
    this.headerView.setTitle(album.replace('+', ' '))
    return PlayRoute(album, id)
  }
}

export default new Router