import Backbone from 'backbone'
import $ from 'jquery'

class Artist extends Backbone.Model {
  constructor(opts) {
    super(opts)
    // this.url = opts && opts.url ? opts.url : null
  }
}

export default Artist