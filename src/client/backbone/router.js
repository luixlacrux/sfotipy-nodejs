import Backbone from 'backbone'
import $ from 'jquery'
/* Views */
import HeaderView from 'src/client/backbone/Vistas/Header/Main'
import HomeView from 'src/client/backbone/Vistas/Home'
/* Routes */
import PlayRoute from 'src/client/backbone/Rutas/Play'
import TopAlbumsRoute from 'src/client/backbone/Rutas/TopAlbums'
import SearchRoute from 'src/client/backbone/Rutas/Search'
import ProfileRoute from 'src/client/backbone/Rutas/Profile'
import ProfileEditRoute from 'src/client/backbone/Rutas/ProfileEdit'

class Router extends Backbone.Router {
  get routes () {
    return {
      'top-albums': 'TopAlbumsRoute',
      'play/:album/:id': 'PlayRoute',
      'home/:action': 'LoginOrSignIn',
      'search/:query': 'SearchRoute',
      '@:username': 'ProfileRoute',
      '@:username/edit': 'ProfileEditRoute',
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
    this.headerView.setTitle(album.replace(/\+/g, ' '))
    return PlayRoute(album, id)
  }

  SearchRoute (q) {
    const query = q.replace(/\+/g, ' ')
    this.headerView.setTitle(`Search: ${query}`)
    this.headerView.setQuery(query)
    return SearchRoute(query)
  }

  ProfileRoute (username) {
    this.headerView.setTitle('Profile')
    return ProfileRoute(username)
  }

  ProfileEditRoute (username) {
    this.headerView.setTitle('Profile Edit')
    return ProfileEditRoute(username)
  }

  LoginOrSignIn (action) {
    if (action === 'login') this.homeView.login()
    if (action === 'signup') this.homeView.signUp()
  }
}

export default new Router