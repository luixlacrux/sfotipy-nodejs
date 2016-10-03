import Backbone from 'backbone'
import $ from 'jquery'
// Viewss
import SongView from './song'

class ListSongView extends Backbone.View {
  get el () { return $('.ViewAlbum ul.songs') }

  initialize () {
    this.listenTo(this.collection, 'add' ,this.addOne, this)
    this.listenTo(this.collection, 'reset' ,this.render, this)
  }

  render () {
    // this.$el.empty()
    this.addAll()
  }

  addOne (song) {
    let songView = new SongView({ model: song, collection: this.collection })
    this.$el.append(songView.render().el)
  }

  addAll () {
    this.collection.forEach(this.addOne, this)
  }
}

export default ListSongView
