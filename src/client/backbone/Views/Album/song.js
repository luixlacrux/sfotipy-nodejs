import Backbone from 'backbone'
import $ from 'jquery'
import template from 'src/client/handlebars/Album/song.hbs'
import app from 'src/client/backbone/router'

class Song extends Backbone.View {
  get tagName () { return 'li' }
  get className () { return 'item' }
  get events () {
    return {
      'click': 'select'
    }
  }

  initialize () {
    this.listenTo(this.model, 'change', this.render, this)
    this.player = app.playingView.player
  }

  render () {
    let song = this.model.toJSON()
    let html = template(song)
    this.$el.html(html)
    return this
  }

  select () {
    const model = this.model.attributes
    this.player.model.set(model)
    return false
  }
}

export default Song
