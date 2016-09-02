import Backbone from 'backbone'
import $ from 'jquery'

class Song extends Backbone.Model {
  constructor(opts) {
    super(opts)
    this.url = opts && opts.url ? opts.url : null
  }

  getRawArtists () {
    console.log(this.attributes.artists)
  }
}

export default Song