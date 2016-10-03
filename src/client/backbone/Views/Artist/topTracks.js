import Backbone from 'backbone'
import $ from 'jquery'
// Import View Song
import SongView from './song'
// import Models
import Song from 'src/client/backbone/Models/Song'

class TopTracksView extends Backbone.View {
  get el () { return $('.top-tracks > ul.songs') }

  initialize () {
    this.listenTo(this.collection, 'add', this.addOne, this)
    this.listenTo(this.collection, 'reset', this.render, this)
  }

  render () {
    this.$el.empty()
    this.addAll()
  }

  addOne (song) {
    let songView = new SongView({ model: song, collection: this.collection })
    this.$el.append(songView.render().el)
  }

  addAll () {
    this.collection.forEach(this.addOne, this)
  }
}

export default TopTracksView
