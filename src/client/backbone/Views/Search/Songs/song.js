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
    const { album_id, index } = this.model.attributes
    app.navigate(`play?album=${album_id}&song=${index}`, { trigger: true })
  }
}

export default SongView
