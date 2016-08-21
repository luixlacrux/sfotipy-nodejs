import Backbone from 'backbone'
import $ from 'jquery'
import template from 'src/client/handlebars/Play/song.hbs'

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

  constructor(opts) {
    super(opts)
    this.player = opts.player
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
    let model = this.model.toJSON()
    this.player.model.set(model)
    //$('.playlist').addClass('border-left')
    return false
  }

  love () {

  }

  share (ev) {
    ev.stopPropagation()
    Sfotipy.events.trigger('share', this.model)
    return false
  }

  add (ev) {
    ev.stopPropagation()
    Sfotipy.events.trigger('playlist', this.model)
    return false
  }
}

export default Song
