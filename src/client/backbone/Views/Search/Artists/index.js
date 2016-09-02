import Backbone from 'backbone'
import $ from 'jquery'
import ArtistView from './artist'

class ArtistsView extends Backbone.View {
  get el () { return $('.Search-artists > .list') }

  render () {
    this.$el.empty()
    this.collection.models
      .map(model => new ArtistView({ model }))
      .forEach(view => {
        view.render()
        view.$el.appendTo(this.$el)
      })
      
    return this
  }
}

export default ArtistsView
