import Backbone from 'backbone'
import $ from 'jquery'
import template from '../../templates/album.html'

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
    Sfotipy.navigate('album/' + this.model.get('name'), { trigger:true })
  }
}

export default AlbumView