import Backbone from 'backbone'
import Song from 'src/client/backbone/models/song'

class Songs extends Backbone.Collection {
  constructor (options) {
    super(options)
    this.model = Song
  }
}

export default Songs
