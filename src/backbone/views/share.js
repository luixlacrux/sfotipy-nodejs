import Backbone from 'backbone'
import $ from 'jquery'
import template from '../../templates/share.html'

class Share extends Backbone.View {
  get el () { return $('.Share') }
  get events () {
    return {
      'click .Share-close': 'hide'
    }
  }

  initialize () {
    this.render()
  }

  render () {
    let song = this.model.toJSON()
    let html = template(song)
    this.$el.html(html)

    this.show()
  }

  show () {
    Sfotipy.events.trigger('share:show')
  }

  hide () {
    Sfotipy.events.trigger('share:hide')
    return false
  }
}

export default Share
