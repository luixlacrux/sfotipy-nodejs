import Backbone from 'backbone'
import $ from 'jquery'
import template from 'src/client/handlebars/Search/artist.hbs'
import app from 'src/client/backbone/router'

class ArtistView extends Backbone.View {
  get tagName () { return 'article' }
  get className () { return 'Search-item' }
  get events () {
    return {
      'click': 'navigate'
    }
  }

  render () {
    this.$el.html(template(this.model.attributes))
    return this
  }

  navigate () {
    let { id, name } = this.model.attributes
    name = name.replace(/\s/g, '+')
    app.navigate(`artist/${name}/${id}`, { trigger: true })
  }
}

export default ArtistView
