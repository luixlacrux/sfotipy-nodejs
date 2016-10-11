import Backbone from 'backbone'
import $ from 'jquery'
import template from 'src/client/handlebars/Album/main.hbs'
import app from 'src/client/backbone/router'

class AlbumView extends Backbone.View {
  get el () { return $('main#app') }
  get events () {
    return {
      'click .btn-save': 'save',
      'click .btn-saved': 'delete',
      'click .btn-play': 'play',
      'click .btn-more': 'more',
      'click .description a': 'artist',
    }
  }

  initialize () {
    this.listenTo(this.model, 'change', this.render, this)
  }

  render () {
    let data = this.model.toJSON()
    let album = {
      cover: data.cover,
      artist: data.artists[0],
      name: data.name,
      type: this.MaysPrimera(data.type),
      total: data.total,
      date: data.date,
      duration: data.duration,
      copyrights: {
        c: data.copyrights[0],
        p: data.copyrights[1]
      }
    }
    let html = template(album)
    this.$el.html(html)
    return this
  }

  save (e) {
    Sfotipy.events.trigger('album:save', this.model.toJSON())
    $(e.target)
      .text('Saved')
      .removeClass('btn-save')
      .addClass('btn-saved')
    return false
  }

  delete (e) {
    Sfotipy.events.trigger('album:delete', this.model.toJSON())
    $(e.target)
      .text('Save')
      .removeClass('btn-saved')
      .addClass('btn-save')
    return false
  }

  play () {
    const id = this.model.id
    app.navigate(`play?album=${id}`, { trigger:true })
    return false
  }

  more () {
    return false
  }

  MaysPrimera (string){
    return string.charAt(0).toUpperCase() + string.slice(1)
  }

  artist () {
    const { id } = this.model.attributes.artists[0]
    app.navigate(`artist/${id}`, { trigger: true })
    return false
  }
}

export default AlbumView
