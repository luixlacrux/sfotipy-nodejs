import Backbone from 'backbone'
import $ from 'jquery'
import template from 'src/client/templates/search/artist.hbs'

class ArtistView extends Backbone.View {
  get tagName () { return 'article' }
  get className () { return 'Search-item' }
  get events () {
    return {
      'click': 'navigate'
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

  navigate () {
    Sfotipy.navigate('artist/' + this.model.get('name'), { trigger: true })
  }
}

export default ArtistView
