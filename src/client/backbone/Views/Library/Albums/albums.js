import Backbone from 'backbone'
import $ from 'jquery'
// Imports View
import AlbumView from './album'

class AlbumsList extends Backbone.View {
  get el () { return $('section.Library') }

  initialize () {
    this.listenTo(this.collection, 'add', this.addOne, this)
    this.listenTo(this.collection, 'reset', this.render, this)
  }

  render () {
    this.$el.empty()
    this.addAll()
  }

  addOne (album) {
    let albumView = new AlbumView({ model: album })
    this.$el.append(albumView.render().el)
  }

  addAll () {
    this.collection.forEach(this.addOne, this)
  }
}

export default AlbumsList
