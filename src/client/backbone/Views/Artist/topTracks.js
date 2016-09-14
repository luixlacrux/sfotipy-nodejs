import Backbone from 'backbone'
import $ from 'jquery'
// Import View Song
import SongView from 'src/client/backbone/Views/Play/Song'
import PlayerView from 'src/client/backbone/Views/Play/Player'
// import Models
import Song from 'src/client/backbone/Models/Song'

class TopTracksView extends Backbone.View {
  get el () { return $('.top-tracks > ul.songs') }

  initialize () {
    this.listenTo(this.collection, 'add', this.addOne, this)
    this.listenTo(this.collection, 'reset', this.render, this)
    this.player = new PlayerView({ model: new Song(), collection: this.collection })
  }

  render () {
    this.$el.empty()
    this.addAll()
    //this.player.trigger('autoplay')
  }

  addOne (song) {
    let songView = new SongView({ model: song, player: this.player })
    this.$el.append(songView.render().el)
  }

  addAll () {
    this.collection.forEach(this.addOne, this)
  }
}

export default TopTracksView
