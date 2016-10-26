import Backbone from 'backbone'
import $ from 'jquery'
import template from 'src/client/handlebars/Song/song101.hbs'
import app from 'src/client/backbone/router'

class MusicView extends Backbone.View {
  get tagName () { return 'article' }
  get className () { return 'music' }
  get events () {
    return {
      'click .name': 'play',
      'click .artist': 'artist'
    }
  }

  initialize () {
    this.listenTo(this.model, 'change', this.render, this)
    this.playing = app.playingView
    this.player = this.playing.player
  }

  render () {
    let music = this.model.toJSON()
    let html = template(music)
    this.$el.html(html)
    return this
  }

  play (e) {
    const { index } = this.model.attributes
    this.playing.collection.reset()
    this.collection.forEach(model => this.playing.collection.add(model))
    this.playing.autoplay(index)
    return false
  }

  artist (e) {
    const id = this.model.attributes.artists[0].id
    Sfotipy.navigate(`/artist/${id}`, { trigger:true })
  }
}

export default MusicView
