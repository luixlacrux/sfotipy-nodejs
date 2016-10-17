import Backbone from 'backbone'
import $ from 'jquery'
import template from 'src/client/handlebars/Components/Artist/artist.hbs'
import app from 'src/client/backbone/router'

class ArtistView extends Backbone.View {
  get tagName() { return 'article' }
  get className() { return 'artist' }
  get events () {
    return {
      'click .name': 'seeArtist'
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

  seeArtist (e) {
    let id = this.model.toJSON().id
    app.navigate(`/artist/${id}`, { trigger:true })
    return false
  }
}

export default ArtistView
