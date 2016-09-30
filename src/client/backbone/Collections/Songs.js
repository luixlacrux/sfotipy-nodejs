import Backbone from 'backbone'
import $ from 'jquery'
import Song from 'src/client/backbone/Models/Song'
import utils from 'src/client/backbone/Utils'

class Songs extends Backbone.Collection {
  constructor(opts) {
    super(opts)
    this.model = Song
    this.url = opts && opts.url ? opts.url : null
  }

  getSongs (id) {
    this.reset()

    return new Promise((resolve, reject) => {

      $.get(this.url).done((songs) => {
        // Por cada cancion
        // esta es agregada a la colleccion
        songs.tracks.forEach(this.parseSongTopTrack, this)
        // retorno exitoso
        return resolve()
      }).error((err) => reject(err))
    })
  }

  addSongs (album) {
    this.reset()
    const songs = album.get('songs')
    songs.forEach(song => {
      this.parseSongAlbum(song, album)
    })
  }

  parseSongAlbum (song, album) {
    const newSong = utils.parseSongAlbum.apply(this, arguments)
    this.add(new Song(newSong))
  }

  parseSongSearch (song) {
    const newSong = utils.parseSongSearch.apply(this, arguments)
    this.add(new Song(newSong))
  }

  parseSongTopTrack (song, index) {
    const newSong = utils.parseSongTopTrack.apply(this, arguments)
    this.add(new Song(newSong))
  }

  getAlbumId () {
    return this.models.length ? this.at(0).get('album_id') : null
  }
}

export default Songs
