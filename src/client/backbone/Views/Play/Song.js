import Backbone from 'backbone'
import $ from 'jquery'
import Share from 'src/client/backbone/Views/Share'
import template from 'src/client/handlebars/Play/song.hbs'
import app from 'src/client/backbone/router'

class Song extends Backbone.View {
  get tagName () { return 'li' }
  get className () { return 'item border-bottom' }
  get events () {
    return {
      'click': 'select',
      'click .action.icon-add': 'add',
      'click .action.icon-love': 'love',
      'click .action.icon-share': 'share'
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

  love () {

  }

  share () {
    // instancio la nueva vista y la muestro
    // return false para terminar la ejecucion
    let shareView = new Share({ model: this.model })
    shareView.show()
    return false
  }

  add (ev) {
    ev.stopPropagation()
    Sfotipy.events.trigger('playlist', this.model)
    return false
  }
}

export default Song
