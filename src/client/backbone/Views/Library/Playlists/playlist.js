import Backbone from 'backbone'
import $ from 'jquery'
import template from 'src/client/handlebars/Library/playlist.hbs'
import app from 'src/client/backbone/router'

class PlaylistView extends Backbone.View {
  get tagName() { return 'article' }
  get className() { return 'playlist' }
  get events () {
    return {
      'click': 'algo'
    }
  }

  initialize () {
    this.listenTo(this.model, 'change', this.render, this)
  }

  render () {
    let data = this.model.toJSON()
    let date = new Date(data.createdAt)
    let playlist = {
      date: `${date.getDate()} ${date.getMonth()} ${date.getFullYear()}`,
      title: data.title,
      id: data.id
    }
    let html = template(playlist)
    this.$el.html(html)
    return this
  }
}

export default PlaylistView
