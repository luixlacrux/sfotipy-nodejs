import Backbone from 'backbone'
import $ from 'jquery'
import Song from 'src/client/backbone/Modelos/Song'
import SongView from './Song'
import PlayerView from './Player'

class List extends Backbone.View {
  get el () { return $('.playlist > .list') }

  initialize () {
    this.listenTo(this.collection, 'add', this.addOne, this)
    this.listenTo(this.collection, 'reset', this.render, this)
    this.player = new PlayerView({ model: new Song(), collection: this.collection }) 
  }

  render () {
    this.$el.empty()
    this.addAll()
    this.player.trigger('autoplay')
  }

  addOne (song) {
    var songView = new SongView({ model: song, player: this.player })
    this.$el.append(songView.render().el)
  }

  addAll () {
    this.collection.forEach(this.addOne, this)
  }
}

export default List
