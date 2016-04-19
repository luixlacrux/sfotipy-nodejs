import Backbone from 'backbone'
import $ from 'jquery'
import template from 'src/client/templates/search/song.html'

class SongView extends Backbone.View {
  get tagName () { return 'article' }
  get className () { return 'Search-item' }
  get events () {
    return {
      'click': 'navigate'
    }
  }

  initialize () {
    this.listenTo(this.model, 'change', this.render, this)
  }

  render () {
    let song = this.model.toJSON()
    let html = template(song)
    this.$el.html(html)
    return this
  }

  navigate () {
    let id_album = this.model.get('id_album')
    Sfotipy.events.trigger('album:get', id_album)
    //Sfotipy.navigate('album/' + this.model.get('album'), { trigger: true })
  }
}

export default SongView