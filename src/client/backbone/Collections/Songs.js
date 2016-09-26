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

  getSong (id) {
    this.reset()

    return new Promise((resolve, reject) => {

      $.get(this.url).done((songs) => {
        // Por cada cancion
        // esta es agregada a la colleccion
        songs.tracks.forEach(this.addSongMoreInfo, this)
        // retorno exitoso
        return resolve()
      }).error((err) => reject(err))
    })
  }

  addSongs (album) {
    this.reset()
    const songs = album.get('songs')
    songs.forEach(song => {
      this.parseSong(song, album)
    })
  }

  parseSong (song, album) {
    this.add(new Song(utils.parseSong2(song, album)))
  }

  addSongMoreInfo (song) {
    this.add(new Song(utils.parseSong(song)))
  }

  getAlbumId () {
    return this.models.length ? this.at(0).get('album_id') : null
  }
}

export default Songs
