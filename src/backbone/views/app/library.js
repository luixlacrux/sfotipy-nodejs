import Backbone from 'backbone'
import $ from 'jquery'
import PlaylistItem from './playlist_Item'
import template from '../../../templates/app/playlist_item.html'

class LibraryView extends Backbone.View {
  get el () { return $('.Share-list') }

  initialize () {
    this.listenTo(this.collection, 'add', this.addOne, this)
    this.render()
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

export default LibraryView