import Backbone from 'backbone'
import $ from 'jquery'
import template from 'src/client/handlebars/LibraryMin/main.hbs'

class PlaylistView extends Backbone.View {
  get el () { return $('.Share') }

  get events () {
    return {
      'click': 'stopEvent',
      'click #showForm': 'showForm',
      'submit #form': 'newPlaylist',
      'click .Share-close': 'hide'
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
    $form.show()
    $form.find('input').focus()
    return false
  }

  newPlaylist (e) {
    let title = $('#form input').val()
    Sfotipy.events.trigger('playlist:new', title)
    this.$el.find('#form').hide().empty()
    return false
  }

  show () {
    document.addEventListener('click', this.hide.bind(this))
    this.$el.animate({ 'right': 0 }, 500)
  }

  hide (ev) {
    if (ev) ev.preventDefault()
    document.removeEventListener('click', this.hide)
    this.$el.animate({ 'right': '-100%' }, 500)
    this.undelegateEvents()
  }

  stopEvent (ev) { ev.stopPropagation() }
}

export default PlaylistView
