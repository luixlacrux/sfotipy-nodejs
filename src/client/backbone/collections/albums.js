import Backbone from 'backbone'
import Album from 'src/client/backbone/models/album'

class Albums extends Backbone.Collection {
  constructor (options) {
    super(options)
    this.model = Album
  }
}

export default Albums
