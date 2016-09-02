import Backbone from 'backbone'
import $ from 'jquery'
import AlbumView from './Album'

class TopAlbumsView extends Backbone.View {
  get tagName () { return 'section' }
  get className () { return 'container' }
  get id () { return 'albums' }

  render () {
    this.collection.models
      .map(model => new AlbumView({ model }))
      .forEach(view => {
        view.render()
        view.$el.appendTo(this.$el)
      })

    return this
  }
}

export default TopAlbumsView