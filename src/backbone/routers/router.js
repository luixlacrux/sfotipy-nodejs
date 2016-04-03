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
      "album/:name": "album"
    }
  }
  
  initialize () {
    this.initEvents()

    this.current = {}
    this.jsonData = {}
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
    if (!Object.keys(this.jsonData).length)
      this.fetchData(this.dataUrl, this.addAlbum.bind(this))
  }

  album (name) {
    $('.music').show()
    if (!Object.keys(this.jsonData).length)
      this.fetchData(this.dataUrl, this.addAlbum.bind(this))
        .done(() =>  this.addSongs(name))
      else
        this.addSongs(name)
  }

  fetchData () {
    this.library.fetch()
    return $.getJSON('assets/data.json')
      .then(data => {
        this.jsonData = data

        for (var name in data) {
          if (data.hasOwnProperty(name))
            this.addAlbum(name, data[name])
        }
      })
  }
  
  addSongs (name) {
    this.songs.reset()
    this.current.album = this.jsonData[name]
    this.current.album.name = name
    this.current.album.songs.forEach(this.addSong, this)
  }

  addSong (song) {
    var album = this.current.album

    this.songs.add(new Song({
      id: song.id,
      album_cover: album.cover,
      album_name: album.name,
      author: album.author,
      name: song.name,
      source: song.source
    }))
  }

  addAlbum (name, album) {
    this.albums.add( new Album({
      name: name,
      author: album.author,
      cover: album.cover,
      year: album.year
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

    if (songs.indexOf(newSong) === -1 ) {
      songs.push(newSong)
      playlist.set('songs', songs) 
    } else {
      alert('La cancion ya existe')
    }

  }
  newPlaylist (name) {
    let model = new Playlist({
      name: name,
      cover: undefined,
      creator: 'luixlacrux',
      songs: []
    })

    this.library.add( model )
    this.events.trigger('playlist:add', model)
  }
}

export default Router
