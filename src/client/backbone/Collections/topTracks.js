import Backbone from 'backbone'
import $ from 'jquery'
import Song from 'src/client/backbone/Models/Song'
import utils from 'src/client/backbone/Utils'

class TopTracks extends Backbone.Collection {
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
        songs.tracks.forEach(this.addSong, this)
        // retorno exitoso
        return resolve()
      }).error((err) => reject(err))
    })
  }

  addSong (song) {
    this.add(new Song(utils.parseSong(song)))
  }
}

export default TopTracks
