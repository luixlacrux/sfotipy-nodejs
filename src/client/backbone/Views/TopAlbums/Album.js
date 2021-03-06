import Backbone from 'backbone'
import $ from 'jquery'
import template from 'src/client/handlebars/TopAlbums/album.hbs'
import app from 'src/client/backbone/router'

class AlbumView extends Backbone.View {
  get tagName() { return 'article' }
  get className() { return 'song' }
  get events () {
    return {
      'click': 'navigate'
      }
  }

  initialize () {
    this.listenTo(this.model, 'change', this.render, this)
  }

  render () {
    let album = this.model.toJSON()
    let html = template(album)
    this.$el.html(html)
    return this
  }

  navigate (ev) {
    const { id } = this.model.attributes
    if (ev.target.classList[0] === 'icon-play') {
      return app.navigate(`play?album=${id}`, { trigger:true })
    }
    app.navigate(`album/${id}`, { trigger:true })
  }
}

export default AlbumView
