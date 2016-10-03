import Backbone from 'backbone'
import $ from 'jquery'
import template from 'src/client/handlebars/Album/main.hbs'
import app from 'src/client/backbone/router'

class AlbumView extends Backbone.View {
  get el () { return $('main#app') }
  get events () {
    return {
      'click .btn-save': 'save',
      'click .btn-play': 'play',
      'click .btn-more': 'more'
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
      copyrights: {
        c: data.copyrights[0],
        p: data.copyrights[1]
      }
    }
    let html = template(album)
    this.$el.html(html)
    return this
  }

  save () {
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
}

export default AlbumView
