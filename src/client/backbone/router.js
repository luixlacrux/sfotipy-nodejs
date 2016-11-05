import Backbone from 'backbone'
import $ from 'jquery'
import qs from 'querystring'
import utils from 'src/client/backbone/Utils'

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
import { Main, GetPlaylist,
  NewPlaylist, AddSong, ViewPlaylist } from 'src/client/backbone/Routes/Playlists'
import { saveAlbum, deleteAlbum } from 'src/client/backbone/Routes/saveAlbum'
import { followArtist, unfollowArtist } from 'src/client/backbone/Routes/followArtist'
import { loveSong, deleteSong } from 'src/client/backbone/Routes/loveSong'
import { songChecker } from 'src/client/backbone/Routes/Checker'
import { AlbumsLibrary,
  PlaylistsLibrary,
  ArtistsLibrary,
  MusicsLibrary } from 'src/client/backbone/Routes/Library'

class Router extends Backbone.Router {
  get routes () {
    return {
      'top-albums': 'TopAlbumsRoute',
      'play': 'PlayRoute',
      'artist/:id': 'ArtistRoute',
      'album/:id': 'AlbumRoute',
      'playlist/:id': 'PlaylistRoute',
      'home/:action': 'LoginOrSignIn',
      'search/:query': 'SearchRoute',
      '@:username': 'ProfileRoute',
      '@:username/edit': 'ProfileEditRoute',
      '@:username/library/artists': 'LibraryArtists',
      '@:username/library/albums': 'LibraryAlbums',
      '@:username/library/playlists': 'LibraryPlaylists',
      '@:username/library/musics': 'LibraryMusics',
      '*notFound': 'notFound',
    }
  }

  init () {
    // Iniciar eventos
    this.initEvents()
    // Defino $playerMin
    this.$playerMin = $('#player-min')
    // Instancio la vista Home
    this.homeView = new HomeView()
    // Si la ruta es diferente de home
    if (Backbone.history.location.pathname.indexOf('/home') === -1) {
      this.headerView = new HeaderView()
      this.initPlayer()
    }
    Backbone.history.start({ root: '/', pushState: true })
  }

  initEvents () {
    // Renderiza el formulario de playlist
    this.events.on('playlist', (song) => {
      Sfotipy.currentSong = song.toJSON()
      Main()
    })
    // New Playlist
    this.events.on('playlist:new', (title) => {
      return NewPlaylist(title)
    })
    // Add song to playlist
    this.events.on('playlist:add', (playlist) => {
      return AddSong(playlist, Sfotipy.currentSong)
    })
    // Save album
    this.events.on('album:save', (album) => {
      saveAlbum(album)
    })
    // Delete album
    this.events.on('album:delete', (album) => {
      deleteAlbum(album)
    })
    // Follow Artist
    this.events.on('artist:save', (artist) => {
      followArtist(artist)
    })
    // Unfollowing Artist
    this.events.on('artist:delete', (artist) => {
      unfollowArtist(artist)
    })
    // Love Song
    this.events.on('song:love', (song) => {
      loveSong(song)
    })
    // delete Song loved
    this.events.on('song:remove', (song) => {
      deleteSong(song)
    })
  }

  initPlayer () {
    // Instancio la vista playingView
    this.playingView = new PlayingView({ collection: new PlayingCollection })
    const data = utils.cache.get('lastPlay')
    const { collection } = this.playingView

    if (data) {
      // reseteamos la collection del player
      collection.reset()
      // agregamos los modelos, pasamos la collection como contexto
      data.models.forEach(collection.add, collection)
      // colocamos la ultima cancion reproducida
      // pausamos el player
      this.playingView.autoplay(data.index)
      this.playingView.player.pause()
    }
  }

  // retornara un 404 Not Found
  notFound () { console.error('Not Found') }

  // Funcion que se ejecutara cada vez que una ruta haga match
  execute (callback, args, name) {
    console.log('Match Route')
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
    songChecker()
    let id = query.album ? query.album : query.playlist
    let song = query.song
    let type = query.album ? 'album' : 'playlist'
    return PlayRoute(type, id, song)
  }

  ArtistRoute (id) {
    this.headerView.setTitle('Artist')
    return ArtistRoute(id)
  }

  AlbumRoute (id) {
    this.headerView.setTitle('Album')
    return AlbumRoute(id)
  }

  PlaylistRoute (id) {
    this.headerView.setTitle('Playlist')
    return ViewPlaylist(id)
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

  // Rutas de la biblioteca
  LibraryArtists (username) {
    this.headerView.setTitle('Your Music / Artist')
    return ArtistsLibrary(username)
  }

  LibraryAlbums (username) {
    this.headerView.setTitle('Your Music / Albums')
    return AlbumsLibrary(username)
  }

  LibraryPlaylists (username) {
    this.headerView.setTitle('Your Music / Playlists')
    return PlaylistsLibrary(username)
  }

  LibraryMusics (username) {
    this.headerView.setTitle('Your Music / Musics')
    return MusicsLibrary(username)
  }

  LoginOrSignIn (action) {
    if (action === 'login') this.homeView.login()
    if (action === 'signup') this.homeView.signUp()
  }
}

export default new Router
