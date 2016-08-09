import Backbone from 'backbone'
import $ from 'jquery'
import PlayRoute from 'src/client/backbone/Rutas/Play'
import TopAlbumsRoute from 'src/client/backbone/Rutas/TopAlbums'

class Router extends Backbone.Router {
  get routes () {
    return {
      'top-albums': 'TopAlbumsRoute',
      'play/:album/:id': 'PlayRoute'
    }
  }

  init () {
    Backbone.history.start({
      root: '/',
      pushState: true
    }) 
  }

  TopAlbumsRoute () { return TopAlbumsRoute() }

  PlayRoute (album, id) { return PlayRoute(album, id) }
}

export default new Router