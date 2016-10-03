import Backbone from 'backbone'
import $ from 'jquery'
import utils from 'src/client/backbone/Utils'

class Artist extends Backbone.Model {
  constructor(opts) {
    super(opts)
    this.url = opts && opts.url ? opts.url : null
  }
  
  setArtist (artist) {
    this.set(utils.parseArtist(artist))
  }
}

export default Artist
