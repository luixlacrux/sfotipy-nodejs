import Backbone from 'backbone'
import $ from 'jquery'
import template from 'src/client/handlebars/Album/main.hbs'

class AlbumView extends Backbone.View {
  get el () { return $('main#app') }

  initialize () {
    this.listenTo(this.model, 'change', this.render, this)
  }

  render () {
    let album = this.model.toJSON()
    let html = template(album)
    this.$el.html(html)
    return this
  }
}

export default AlbumView
