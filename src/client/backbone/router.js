import Backbone from 'backbone'
import $ from 'jquery'
import qs from 'querystring'

/* Views */
import HeaderView from 'src/client/backbone/Views/Header/Main'
import HomeView from 'src/client/backbone/Views/Home'
// import PlayerView from 'src/client/backbone/Views/Play/Player'
import PlayingView from 'src/client/backbone/Views/Play/List'

/* Models, Collections */
import PlayingCollection from 'src/client/backbone/Collections/Songs'
// import AlbumModel from 'src/client/backbone/Models/Album'

/* Routes */
import PlayRoute from 'src/client/backbone/Routes/Play'
import ArtistRoute from 'src/client/backbone/Routes/Artist'
import AlbumRoute from 'src/client/backbone/Routes/Album'
import TopAlbumsRoute from 'src/client/backbone/Routes/TopAlbums'
import SearchRoute from 'src/client/backbone/Routes/Search'
import ProfileRoute from 'src/client/backbone/Routes/Profile'
import ProfileEditRoute from 'src/client/backbone/Routes/ProfileEdit'

class Router extends Backbone.Router {
  get routes () {
    return {
      'top-albums': 'TopAlbumsRoute',
      'play': 'PlayRoute',
      'artist/:id': 'ArtistRoute',
      'album/:id': 'AlbumRoute',
      'home/:action': 'LoginOrSignIn',
      'search/:query': 'SearchRoute',
      '@:username': 'ProfileRoute',
      '@:username/edit': 'ProfileEditRoute',
      '*notFound': 'notFound',
    }
  }

  init () {
    // Defino $playerMin
    this.$playerMin = $('#player-min')
    // Instancio la vista header y Home
    this.headerView = new HeaderView()
    this.homeView = new HomeView()
    // Instancio la vista playingView
    this.playingView = new PlayingView({ collection: new PlayingCollection })
    Backbone.history.start({ root: '/', pushState: true })
  }

  // retornara un 404 Not Found
  notFound () { console.error('Not Found') }

  // Funcion que se ejecutara cada vez que una ruta haga match
  execute (callback, args, name) {
    console.log('Match Route')
    // Mostramos el $playerMin en cada ruta
    this.$playerMin.show()
    args.push(qs.parse(args.pop()))
    if (callback) callback.apply(this, args)
  }

  TopAlbumsRoute () {
    this.headerView.setTitle('Top Albums')
    return TopAlbumsRoute()
  }

  PlayRoute (query) {
    this.headerView.setTitle('Player')
    return PlayRoute(query.album, query.song)
  }

  ArtistRoute (id) {
    return ArtistRoute(id)
  }

  AlbumRoute (id) {
    return AlbumRoute(id)
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
