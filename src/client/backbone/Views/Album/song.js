import Backbone from 'backbone'
import $ from 'jquery'
import template from 'src/client/handlebars/Album/song.hbs'
import app from 'src/client/backbone/router'

class Song extends Backbone.View {
  get tagName () { return 'li' }
  get className () { return 'item border-bottom' }
  get events () {
    return {
      'click': 'select'
    }
  }

  initialize () {
    this.listenTo(this.model, 'change', this.render, this)

  }
  render () {
    let song = this.model.toJSON()
    let html = template(song)
    this.$el.html(html)
    return this
  }

  select () {
    const { album_id, index } = this.model.attributes
    app.navigate(`play?album=${album_id}&song=${index}`, { trigger: true })
    return false
  }
}

export default Song
