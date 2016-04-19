import Backbone from 'backbone'
import $ from 'jquery'
import template from 'src/client/templates/top_albums/album.html'

class AlbumView extends Backbone.View {
  get tagName() { return 'article' } 
  get className() { return 'song' }
  get events () {
    return {
      'click': 'navigate'
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

  navigate () {
    $('.music').show()
    let author = this.model.get('author')
    let name = this.model.get('name')
    Sfotipy.navigate(`album/${name}`, { trigger:true })
  }
}

export default AlbumView