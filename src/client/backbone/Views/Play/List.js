import Backbone from 'backbone'
import $ from 'jquery'
import Song from 'src/client/backbone/Models/Song'
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
  }

  autoplay (index) {
    const length = this.collection.models.length
    if (length) {
      if (index > length) {
        this.player.model.set(this.collection.at(length - 1).toJSON())
      } else {
        this.player.model.set(this.collection.at(index).toJSON())
      }
    }
  }

  addOne (song) {
    const songView = new SongView({ model: song })
    this.$el.append(songView.render().el)
  }

  addAll () {
    this.collection.forEach(this.addOne, this)
  }
}

export default List
