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
      'click .action.btn-love': 'love',
      'click .action.btn-loved': 'delete',
      'click .action.icon-share': 'share'
    }
  }

  initialize () {
    this.listenTo(this.model, 'change', this.render, this)
    this.player = app.playingView.player

    // Checker of songs
    Sfotipy.events.on('songs:loved', (id) => {
      if (id == this.model.toJSON().id) {
        this.$el.find('.btn-love')
          .removeClass('btn-love')
          .addClass('btn-loved')
      }
    })
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

  love (e) {
    Sfotipy.events.trigger('song:love', this.model.toJSON())
    $(e.target)
      .removeClass('btn-love')
      .addClass('btn-loved')
    return false
  }

  delete (e) {
    Sfotipy.events.trigger('song:remove', this.model.toJSON())
    $(e.target)
      .removeClass('btn-loved')
      .addClass('btn-love')
    return false
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
