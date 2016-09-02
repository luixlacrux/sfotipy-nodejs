import Backbone from 'backbone'
import $ from 'jquery'
import template from 'src/client/handlebars/Search/song.hbs'
import app from 'src/client/backbone/router'

class SongView extends Backbone.View {
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
    let { album, album_id } = this.model.attributes
    album = album.replace(/\s/g, '+')
    app.navigate(`play/${album}/${album_id}`, { trigger: true })
  }
}

export default SongView
