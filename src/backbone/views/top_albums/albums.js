import Backbone from 'backbone'
import $ from 'jquery'
import AlbumView from './album'
import template from '../../../templates/top_albums/album.html'

class AlbumsView extends Backbone.View {
  get el () { return $('#albums')}

  initialize () {
    this.listenTo(this.collection, 'add', this.addOne, this)
  }

  render () {
    this.$el.empty()
    this.collection.forEach(this.addOne, this)
  }

  addOne (album) {
    var albumView = new AlbumView({ model: album })
    this.$el.append(albumView.render().el)
  }
}

export default AlbumsView