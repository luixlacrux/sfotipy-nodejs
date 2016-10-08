import Backbone from 'backbone'
import $ from 'jquery'
import template from 'src/client/handlebars/Library/main.hbs'

class PlaylistView extends Backbone.View {
  get el () { return $('.Share') }

  get events () {
    return {
      'click #showForm': 'showForm',
      'submit #form': 'newPlaylist',
      'click .Share-close': 'close'
    }
  }

  initialize () {
    this.listenTo(this.model, 'change', this.render, this)
  }

  render () {
    this.$el.empty()
    this.$el.html(template())
  }

  showForm (e) {
    let $form = this.$el.find('#form')
    let $btn = $(e.target)
    $btn.css('display', 'none')
    $form.css('display', 'block')
    $form.find('input').focus()
    return false
  }

  newPlaylist (e) {
    let $form = this.$el.find('#form')
    let text = $form.find('input').val()
    Sfotipy.events.trigger('playlist:new', text)
    return false
  }

  close (e) {
    this.$el.css('right', '-80%')
    return false
  }
}

export default PlaylistView
