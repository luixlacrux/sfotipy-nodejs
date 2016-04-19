import Backbone from 'backbone'
import Playlist from 'src/client/backbone/models/playlist'

class Library extends Backbone.Collection {
  constructor (options) {
    super(options)
    this.model = Playlist
    this.url = 'assets/playlist.json'
  }
}

export default Library
