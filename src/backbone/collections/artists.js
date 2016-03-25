import Backbone from 'backbone'
import Artist from '../models/artist'

class Artists extends Backbone.Collection {
  constructor (options) {
    super(options)
    this.model = Artist
  }
}

export default Artists
