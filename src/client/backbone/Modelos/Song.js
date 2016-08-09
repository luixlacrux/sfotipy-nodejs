import Backbone from 'backbone'
import $ from 'jquery'

class Song extends Backbone.Model {
  constructor(opts) {
    super(opts)
    this.url = opts ? opts.url : null
  }
}

export default Song