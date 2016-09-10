import Backbone from 'backbone'
import $ from 'jquery'
import utils from 'src/client/backbone/Utils'

class Artist extends Backbone.Model {
  constructor(opts) {
    super(opts)
    this.url = opts && opts.url ? opts.url : null
  }

  fetchData (id) {
    return new Promise((resolve, reject) => {
      $.get(this.url).done(artist => {
        this.setArtist(artist)
        return resolve()
      }).error(err => reject(err))
    })
  }

  setArtist (artist) {
    this.set(utils.parseArtist(artist))
  }
}

export default Artist
