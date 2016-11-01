import Backbone from 'backbone'
import $ from 'jquery'
import template from 'src/client/handlebars/Playlist/main.hbs'
import app from 'src/client/backbone/router'

class PlaylistView extends Backbone.View {
  get el () { return $('main#app') }
  get events () {
    return {
      'click .btn-play': 'play'
    }
  }

  initialize () {
    this.listenTo(this.model, 'change', this.render, this)
  }

  render () {
    let data = this.model.toJSON()
    let html = template(data)
    this.$el.html(html)
    return this
  }

  play () {
    const id = this.model.id
    app.navigate(`play?playlist=${id}`, { trigger:true })
    return false
  }
}

export default PlaylistView
