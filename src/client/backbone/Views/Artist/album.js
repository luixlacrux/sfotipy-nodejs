import Backbone from 'backbone'
import $ from 'jquery'
import template from 'src/client/handlebars/Artist/album.hbs'
import app from 'src/client/backbone/router'

class AlbumView extends Backbone.View {
  get tagName () { return 'article' }
  get className () { return 'album' }
  get events () {
    return {
      'click .btn-save': 'save',
      'click .btn-play': 'play'
    }
  }

  initialize () {
    this.listenTo(this.model, 'change', this.render, this)
  }

  render () {
    let album = this.model.toJSON()
    let html = template(album)
    this.$el.html(html)
    return this
  }

  save (){
    console.log('no save :)')
    return false
  }

  play () {
    const id = this.model.id
    app.navigate(`play?album=${id}`, { trigger:true })
    return false
  }
}

export default AlbumView
