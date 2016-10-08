import Backbone from 'backbone'
import $ from 'jquery'
import template from 'src/client/handlebars/Library/item.hbs'

class PlaylistItem extends Backbone.View {
  get tagName () { return 'li' }
  get events () {
    return {
      'click': 'add'
    }
  }

  initialize () {
    this.listenTo(this.model, 'change', this.render, this)
  }

  render () {
    let playlist = this.model.toJSON()
    let html = template(playlist)
    this.$el.html(html)
    return this
  }

  add () {
    Sfotipy.events.trigger('playlist:add', this.model)
    return false
  }
}

export default PlaylistItem
