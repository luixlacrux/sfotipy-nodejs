import Backbone from 'backbone'
import Album from '../models/album'

class Albums extends Backbone.Collection {
  constructor (options) {
    super(options)
    this.model = Album
    this.url = 'assets/data.json'
  }
}

export default Albums
