import Backbone from 'backbone'
import $ from 'jquery'

import Album from '../models/album'
import Song from '../models/song'

import Albums from '../collections/albums'
import Songs from '../collections/songs'

import Main from '../views/main'
import loginBasic from '../views/loginBasic'
import Player from '../views/player'
import AlbumsView from '../views/albums'
import List from '../views/list'

class Router extends Backbone.Router {
  get routes () {
    return {
      "": "start",
      "album/:name": "album"
    }
  }
  
  initialize () {
    this.current = {}
    this.jsonData = {}
    this.albums = new Albums()
    this.songs = new Songs()
    this.mainView = new Main()
    this.loginBasic = new loginBasic()
    this.playlist = new List({ collection: this.songs })
    this.player = new Player({ model: new Song })
    this.albumlist = new AlbumsView({ collection: this.albums}) 
    Backbone.history.start()
  }

  start () {
    if (!Object.keys(this.jsonData).length)
      this.fetchData()
  }

  album (name) {
    $('.music').show()
    if (!Object.keys(this.jsonData).length)
      this.fetchData().done(() =>  this.addSongs(name))
      else
        this.addSongs(name)
  }

  fetchData () {
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
}

export default Router