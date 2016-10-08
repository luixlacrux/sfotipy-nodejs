import Backbone from 'backbone'
import $ from 'jquery'
import PlaylistItem from './Item'

class Playlist extends Backbone.View {
  get el () { return $('.Share-list') }

  initialize () {
    this.listenTo(this.collection, 'add', this.addOne, this)
    this.listenTo(this.collection, 'reset', this.render, this)
  }

  render () {
    this.$el.empty()
    this.collection.forEach(this.addOne, this)
  }

  addOne (playlist) {
    let playlistView = new PlaylistItem({ model: playlist })
    this.$el.append(playlistView.render().el)
  }
}

export default Playlist
