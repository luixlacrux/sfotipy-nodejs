// Modules Dependecies
import Backbone from 'backbone'
import $ from 'jquery'
import _ from 'underscore'
import SpotifyCli from 'spotify-finder'

// Models
import Album from 'src/client/backbone/models/album'
import Song from 'src/client/backbone/models/song'
import Playlist from 'src/client/backbone/models/playlist'
import Artist from 'src/client/backbone/models/artist'

// Collections
import Albums from 'src/client/backbone/collections/albums'
import Songs from 'src/client/backbone/collections/songs'
import Library from 'src/client/backbone/collections/library'
import Artists from 'src/client/backbone/collections/artists'

//Views
import Main from 'src/client/backbone/views/app/main'
import Share from 'src/client/backbone/views/app/share'
import LibraryView from 'src/client/backbone/views/app/library'
import PlaylistView from 'src/client/backbone/views/app/playlist_View'

import Login from 'src/client/backbone/views/home/login'

import List from 'src/client/backbone/views/player/list'
import Player from 'src/client/backbone/views/player/player'

import SongsView from 'src/client/backbone/views/search/songs'
import AlbumsView from 'src/client/backbone/views/search/albums'
import ArtistsView from 'src/client/backbone/views/search/artists'

import TopAlbumsView from 'src/client/backbone/views/top_albums/albums'

//API
import { ApiSearch, ApiAlbums } from '../api'

const Spotify =  SpotifyCli.createClient()

class Router extends Backbone.Router {
  get routes () {
    return {
      "top-albums": "start",
      "album/:name": "album",
      "search/:query": "showSearch",
      "home/:action": "showHomeForm"
    }
  }

  initialize () {
    this.initEvents()
    this.current = {}
    this.$loader = [$('<div class="loader">'),
                    $('<div class="loader">'),
                    $('<div class="loader">')]
    //Collections
    this.playing = new Songs()
    this.topAlbums = new Albums()
    this.library = new Library()
    this.artists = new Artists()
    this.albums = new Albums()
    this.songs = new Songs()
    // Views
    this.mainView = new Main()
    this.login = new Login()
    this.list = new List({ collection: this.playing })
    this.player = new Player({ model: new Song })
    this.topAlbumsView = new TopAlbumsView({ collection: this.topAlbums })

    this.artistsList = new ArtistsView({ collection: this.artists })
    this.albumsList = new AlbumsView({ collection: this.albums })
    this.songsList = new SongsView({ collection: this.songs })

    Backbone.history.start({
      root: '/',
      pushState: true
    })
  }

  initEvents () {
    this.events = {}
    _.extend(this.events, Backbone.Events)

    this.events.on('share', model => this.share(model))
    this.events.on('share:hide', () => this.mainView.hideShare())
    this.events.on('share:show', () => this.mainView.showShare())

    this.events.on('playlist', model => this.playlist(model))
    this.events.on('playlist:hide', () => this.mainView.hideShare())
    this.events.on('playlist:show', () => this.mainView.showShare())
    this.events.on('playlist:add', playlist => this.addToPlaylist(playlist))
    this.events.on('playlist:new', name => this.newPlaylist(name))

    this.events.on('search:hide', () => this.mainView.hideSearch())
    this.events.on('search:show', query => this.mainView.showSearch(query))
    this.events.on('music:hide', () => this.mainView.hideMusic())
    this.events.on('music:show', () => this.mainView.showMusic())

    this.events.on('album:get', id => this.getAlbum(id).then(name => {
      this.album(name)
      this.navigate(`album/${name}`, { trigger: true })
    }))
  }

  start () {
    if (this.topAlbums.length === 0)
      this.fetchData()
  }

  fetchData () {
    return new Promise((resolve, reject) => {
      ApiAlbums(albums => {
        albums.forEach(this.parseTopAlbum, this)
        resolve(this.addSongs.bind(this))
      })
    })
  }

  parseTopAlbum (item) {
    let album = new Album({
      id_spotify: item.id,
      name: item.name,
      cover: this.checkImage(item.images),
      author: item.artists[0].name,
      songs: item.tracks.items,
      album: item.album_type
    })

    this.topAlbums.add(album)
  }

  album (name) {
    this.events.trigger('search:hide')
    this.events.trigger('music:show')

    $('.music').show()
    if (this.topAlbums.length === 0)
      this.fetchData()
        .then(callback => callback(name))
    else
      this.addSongs(name)
  }

  addSongs (name) {
    this.playing.reset()
    this.current.album = this.topAlbums.findWhere({ name: name })
    this.current.album.songs = this.current.album.get('songs')
    this.current.album.songs.forEach(this.addSong, this)
  }

  addSong (song) {
    var album = this.current.album

    this.playing.add(new Song({
      id_spotify: song.id,
      id: song.track_number,
      album_cover: album.get('cover'),
      album_name: album.get('name'),
      author: album.get('author'),
      name: song.name,
      source: song.preview_url
    }))
  }

  getAlbum (id) {
    return new Promise((resolve, reject) => {
      Spotify.getAlbum(id, { tracks: false }, (err, album) => {
        if (err) return reject(err)

        this.parseTopAlbum(album)
        resolve(album.name)
      })
    })
  }

  share (model) {
    this.shareView = new Share({ model: model })
  }

  playlist (model) {
    this.playlistView = new PlaylistView()
    this.librarylist = new LibraryView({ collection: this.library })
    this.current.songActually = model
  }

  addToPlaylist (playlist) {
    let songs = playlist.get('songs')
    let newSong = this.current.songActually

    if (songs.find( song => song.get('name') === newSong.get('name') ))
      if (songs.find( song => song.get('author') === newSong.get('author') ))
        console.log('La cancion ya existe')
        else
          add()
      else
        add()

    function add () {
      songs.push(newSong)
      playlist.s
    }

  }
  newPlaylist (name) {
    let playlist = new Playlist({
      name: name,
      cover: undefined,
      creator: 'luixlacrux',
      songs: []
    })

    this.library.add( playlist )
    this.events.trigger('playlist:add', playlist)
  }

  showSearch (query) {
    this.events.trigger('music:hide')
    this.events.trigger('search:show', query)
    this.artists.reset()
    this.albums.reset()
    this.songs.reset()
    this.createLoader()
    this.search(query)
  }

  createLoader () {
    this.$loader[0].appendTo(this.artistsList.el)
    this.$loader[1].appendTo(this.albumsList.el)
    this.$loader[2].appendTo(this.songsList.el)
  }

  removeLoader () {
    this.$loader[0].remove()
    this.$loader[1].remove()
    this.$loader[2].remove()
  }

  search (query) {
    ApiSearch(query, data => {
      this.removeLoader()
      data.artists.items.forEach(this.parseArtist, this)
      data.albums.items.forEach(this.parseAlbum, this)
      data.tracks.items.forEach(this.parseSong, this)
    })
  }

  checkImage (images) {
    let length = Object.keys(images).length
    if (length === 0)
      return null
    else if (length === 1)
      return images[0].url
    else
      return images[1].url
  }


  parseArtist (item) {
    let artist = new Artist({
      id_spotify: item.id,
      genres: item.genres.toString(),
      name: item.name,
      followers: item.followers.total,
      image: this.checkImage(item.images)
    })

    this.artists.add(artist)
  }

  parseAlbum (item) {
    let album = new Album({
      id_spotify: item.id,
      name: item.name,
      cover: this.checkImage(item.images),
      //author: item.artists,
      album: item.album_type
    })

    this.albums.add(album)
  }

  parseSong (item) {
    let song = new Song({
      id_spotify: item.id,
      duration: item.duration_ms,
      name: item.name,
      artist: item.artists[0].name,
      album: item.album.name,
      id_album: item.album.id
    })

    this.songs.add(song)
  }

  showHomeForm (action) {
    console.log(action)
    if (action === 'login')
      this.login.showLogin()
    if (action === 'signup')
      this.login.showSignIn()
  }
}

export default Router
