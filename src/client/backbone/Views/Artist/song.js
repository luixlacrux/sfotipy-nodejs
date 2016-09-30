import Backbone from 'backbone'
import $ from 'jquery'
import SongView from 'src/client/backbone/Views/Play/Song'
import app from 'src/client/backbone/router'

class SongTopTrackView extends SongView {
  constructor (opts) {
    super(opts)
    this.playing = app.playingView
    this.player = this.playing.player
  }

  select () {
    const { index } = this.model.attributes
    this.playing.collection.reset()
    this.collection.forEach(model => this.playing.collection.add(model))
    this.playing.autoplay(index)
  }
}

export default SongTopTrackView
