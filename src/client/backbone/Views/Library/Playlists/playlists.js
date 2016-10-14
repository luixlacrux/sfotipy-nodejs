import Backbone from 'backbone'
import $ from 'jquery'

import PlaylistView from './playlist'

class PlaylistsView extends Backbone.View {
  get el () { return $('section.Library') }

  initialize () {
    this.listenTo(this.collection, 'add', this.addOne, this)
    this.listenTo(this.collection, 'reset', this.render, this)
  }
  render () {
    this.$el.empty()
    this.addAll()
  }

  addOne (playlist) {
    let playlistView = new PlaylistView({ model: playlist })
    this.$el.append(playlistView.render().el)
  }

  addAll () {
    this.collection.forEach(this.addOne, this)
  }
}

export default PlaylistsView
