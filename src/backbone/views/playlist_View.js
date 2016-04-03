import Backbone from 'backbone'
import $ from 'jquery'
import template from '../../templates/playlist.html'

class Playlist extends Backbone.View {
  get el () { return $('.share') }
  get events () {
    return {
      'click .share-close': 'hide',
      'click .share-item.border-bottom': 'toggleInput'
      //'submit': 'newPlaylist' 
    }
  }

  initialize () {
    this.render()
    this.$form = this.$el.find('form')
    this.$el.unbind('submit')
    this.initEvents()
  }

  render () {
    this.$el.html(template())
    this.show()
  }

  initEvents () {
    this.$el.on('submit', (ev) => {
      ev.preventDefault()
      this.newPlaylist()
    })
  }

  show () {
    Sfotipy.events.trigger('playlist:show')
  }

  hide () {
    Sfotipy.events.trigger('playlist:hide')
    return false
  }

  toggleInput () {
    this.$form.slideToggle()
    this.$form.find('input').val('')
    return false
  }

  newPlaylist () {
    let playlistName = this.$form.find('input').val()
    Sfotipy.events.trigger('playlist:new', playlistName)
    this.toggleInput()
    return false
  }

}

export default Playlist
