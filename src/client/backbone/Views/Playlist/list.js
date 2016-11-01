import Backbone from 'backbone'
import $ from 'jquery'
// Views
import SongListView from 'src/client/backbone/Views/Album/list'
import SongView from './song'

class ListSongView extends SongListView {
  addOne (song) {
    let songView = new SongView({ model: song, collection: this.collection })
    this.$el.append(songView.render().el)
  }
}

export default ListSongView
