import Backbone from 'backbone'
import $ from 'jquery'
import template from 'src/client/templates/search/song.html'
import SongView from './song'

class SongsView extends Backbone.View {
  get el () { return $('.Search-songs > .list') }

  initialize () {
    this.listenTo(this.collection, 'add', this.addOne, this)
    this.listenTo(this.collection, 'reset', this.render, this)
  }

  render () {
    this.$el.empty()
    this.addAll()
  }

  addOne (song) {
    let songView = new SongView({ model: song })
    this.$el.append(songView.render().el)
  }
  
  addAll () {
    this.collection.forEach(this.addOne, this)
  }
}

export default SongsView