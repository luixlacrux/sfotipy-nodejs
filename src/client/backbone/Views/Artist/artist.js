import Backbone from 'backbone'
import $ from 'jquery'
import template from 'src/client/handlebars/Artist/artist.hbs'

class ViewArtistView extends Backbone.View {
  get tagName () { return 'span' }
  get className () { return 'artist-element' }

  get events () {
    return {
      'click .btn-follow-artist': 'follow'
    }
  }

  initialize () {
    this.listenTo(this.model, 'change', this.render, this)
  }

  render () {
    let artist = this.model.toJSON()
    let html = template(artist)
    this.$el.html(html)
    return this
  }

  follow (e) {
    Sfotipy.events.trigger('artist:save', this.model.toJSON())
    return false
  }
}

export default ViewArtistView
