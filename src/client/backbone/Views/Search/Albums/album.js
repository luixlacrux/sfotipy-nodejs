import Backbone from 'backbone'
import $ from 'jquery'
import template from 'src/client/handlebars/Search/album.hbs'
import app from 'src/client/backbone/router'

class AlbumView extends Backbone.View {
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
    const { id } = this.model.attributes
    app.navigate(`play?album=${id}`, { trigger: true })
  }
}

export default AlbumView
