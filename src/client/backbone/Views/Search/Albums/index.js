import Backbone from 'backbone'
import $ from 'jquery'
import AlbumView from './album'

class AlbumsView extends Backbone.View {
  get el () { return $('.Search-albums > .list') }

  render () {
    this.$el.empty()
    this.collection.models
      .map(model => new AlbumView({ model }))
      .forEach(view => {
        view.render()
        view.$el.appendTo(this.$el)
      })

    return this
  }
}

export default AlbumsView
