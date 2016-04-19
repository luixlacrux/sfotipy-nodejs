import Backbone from 'backbone'
import Artist from 'src/client/backbone/models/artist'

class Artists extends Backbone.Collection {
  constructor (options) {
    super(options)
    this.model = Artist
  }
}

export default Artists
