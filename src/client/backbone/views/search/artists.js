import Backbone from 'backbone'
import $ from 'jquery'
import template from 'src/client/templates/search/artist.hbs'
import ArtistView from './artist'

class ArtistsView extends Backbone.View {
  get el () { return $('.Search-artists > .list') }

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

export default ArtistsView
