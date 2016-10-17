import Backbone from 'backbone'
import $ from 'jquery'
// Imports View
import ArtistView from './artist'

class ArtistsList extends Backbone.View {
  get el () { return $('section.Library') }

  initialize () {
    this.listenTo(this.collection, 'add', this.addOne, this)
    this.listenTo(this.collection, 'reset', this.render, this)
  }

  render () {
    this.$el.empty()
    this.addAll()
  }

  addOne (artist) {
    let artistView = new ArtistView({ model: artist })
    this.$el.append(artistView.render().el)
  }

  addAll () {
    this.collection.forEach(this.addOne, this)
  }
}

export default ArtistsList
