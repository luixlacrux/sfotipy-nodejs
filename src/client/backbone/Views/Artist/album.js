import Backbone from 'backbone'
import $ from 'jquery'
import template from 'src/client/handlebars/Artist/album.hbs'

class AlbumView extends Backbone.View {
  get tagName () { return 'article' }
  get className () { return 'album' }
  get events () {
    return {
      'click .btn-save': 'save',
      'click .photo-album': 'play'
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
  }

  play () {
    console.log('yet without functionality :(')
  }
}

export default AlbumView
