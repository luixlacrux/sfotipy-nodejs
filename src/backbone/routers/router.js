import Backbone from 'backbone'
import $ from 'jquery'
import _ from 'underscore'

import Album from '../models/album'
import Song from '../models/song'
import Playlist from '../models/playlist'

import Albums from '../collections/albums'
import Songs from '../collections/songs'
import Library from '../collections/library'

import Main from '../views/main'
import loginBasic from '../views/loginBasic'
import Player from '../views/player'
import AlbumsView from '../views/albums'
import List from '../views/list'
import Share from '../views/share'
import PlaylistView from '../views/playlist_View'
import LibraryView from '../views/library'

class Router extends Backbone.Router {
  get routes () {
    return {
      "": "start",
      "album/:name": "album",
      "search/?q=:query": "search"
    }
  }
  
  initialize () {
    this.initEvents()

    this.current = {}
    this.albums = new Albums()
    this.songs = new Songs()
    this.library = new Library()
    this.mainView = new Main()
    this.loginBasic = new loginBasic()
    this.list = new List({ collection: this.songs })
    this.player = new Player({ model: new Song })
    this.albumlist = new AlbumsView({ collection: this.albums })

    Backbone.history.start()
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
  }

  start () {
    if (this.albums.length === 0 || this.library.length === 0)
      this.fetchData()
  }

  fetchData (callback) {
    this.library.fetch()
    this.albums.fetch()
      .done(callback)
  }
  
  album (name) {
    var self = this
    $('.music').show()
    if (this.albums.length === 0)
      this.fetchData(addSongs)
      else
        addSongs()
      
    function addSongs () {
      self.songs.reset()
      self.current.album = self.albums.findWhere({ name: name })
      self.current.album.songs = self.current.album.get('songs')
      self.current.album.songs.forEach(self.addSong, self)
    }
  }

  addSong (song) {
    var album = this.current.album

    this.songs.add(new Song({
      id: song.id,
      album_cover: album.get('cover'),
      album_name: album.get('name'),
      author: album.get('author'),
      name: song.name,
      source: song.source
    }))
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
      playlist.set('songs', songs)
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

  search (query) {
    $.ajax({
      url: 'https://api.spotify.com/v1/search',
      method: 'GET',
      dataType: 'json',
      data: {
        q: query,
        type: 'playlist'
      },

      error: err => console.log(err),
      success: data => console.log(data)
    })
  }
}

export default Router
