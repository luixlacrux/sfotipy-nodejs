import Backbone from 'backbone'
import $ from 'jquery'
/* Views */
import HeaderView from 'src/client/backbone/Vistas/Header/Main'
import HomeView from 'src/client/backbone/Vistas/Home'
/* Routes */
import PlayRoute from 'src/client/backbone/Rutas/Play'
import TopAlbumsRoute from 'src/client/backbone/Rutas/TopAlbums'

class Router extends Backbone.Router {
  get routes () {
    return {
      'top-albums': 'TopAlbumsRoute',
      'play/:album/:id': 'PlayRoute',
      'home/:form': 'LoginOrSignIn',
      '*notFound': 'notFound',
    }
  }

  init () {
    // Instancio la vista header y Home
    this.headerView = new HeaderView()
    this.homeView = new HomeView()
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

  LoginOrSignIn (form) {
    if (form === 'login') this.homeView.login()
    if (form === 'signup') this.homeView.signUp()
  }
}

export default new Router