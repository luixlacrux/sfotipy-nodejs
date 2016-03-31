import Backbone from 'backbone'
import $ from 'jquery'
import template from '../../templates/song.html'

class Song extends Backbone.View {
  get tagName () { return 'li' }
  get className () { return 'item border-bottom' }
  get events () {
    return {
      'click': 'select',
      'click .action.icon-love': 'love',
      'click .action.icon-share': 'share'
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
    Sfotipy.player.model.set(this.model.toJSON())
    $('.playlist').addClass('border-left')
    return false
  }

  love () {

  }

  share (ev) {
    ev.stopPropagation()
    Sfotipy.events.trigger('share', this.model)
    return false
  }
}  

export default Song
