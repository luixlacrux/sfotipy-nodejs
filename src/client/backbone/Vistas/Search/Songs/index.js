import Backbone from 'backbone'
import $ from 'jquery'
import SongView from './song'

class SongsView extends Backbone.View {
  get el () { return $('.Search-songs > .list') }

  render () {
    this.$el.empty()
    this.collection.models
      .map(model => new SongView({ model }))
      .forEach(view => {
        view.render()
        view.$el.appendTo(this.$el)
      })

    return this
  }
}

export default SongsView
