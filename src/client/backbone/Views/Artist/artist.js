import Backbone from 'backbone'
import $ from 'jquery'
import template from 'src/client/handlebars/Artist/artist.hbs'

class ViewArtistView extends Backbone.View {
  get tagName () { return 'span' }
  get className () { return 'artist-element' }

  initialize () {
    this.listenTo(this.model, 'change', this.render, this)
  }

  render () {
    let artist = this.model.toJSON()
    let html = template(artist)
    this.$el.html(html)
    return this
  }
}

export default ViewArtistView
