import Backbone from 'backbone'
import $ from 'jquery'
import template from 'src/client/handlebars/TopAlbums/album.hbs'
import app from 'src/client/backbone/router'

class PlaylistView extends Backbone.View {
  get tagName() { return 'article' }
  get className() { return 'song' }
  get events () {
    return {
      'click .name': 'detail'
    }
  }

  initialize () {
    this.listenTo(this.model, 'change', this.render, this)
  }

  render () {
    let data = this.model.toJSON()
    let date = new Date(data.createdAt)
    let playlist = {
      date: {
        day: date.getDate(),
        month: date.getMonth(),
        year: date.getFullYear()
      },
      name: data.title,
      id: data.id
    }
    let html = template(playlist)
    this.$el.html(html)
    return this
  }

  detail (e) {
    let id = this.model.toJSON().id
    Sfotipy.navigate(`/playlist/${id}`, { trigger:true })
    return false
  }
}

export default PlaylistView
