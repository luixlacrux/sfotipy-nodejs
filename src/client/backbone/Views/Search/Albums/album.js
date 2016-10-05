import Backbone from 'backbone'
import $ from 'jquery'
import template from 'src/client/handlebars/Search/album.hbs'
import app from 'src/client/backbone/router'

class AlbumView extends Backbone.View {
  get tagName () { return 'article' }
  get className () { return 'Search-item' }
  get events () {
    return {
      'click': 'show'
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

  show () {
    const id = this.model.id
    app.navigate(`album/${id}`, { trigger:true })
    return false
  }
}

export default AlbumView
