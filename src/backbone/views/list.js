import Backbone from 'backbone'
import Song from './song'
import $ from 'jquery'

class List extends Backbone.View {
  get el () { return $('.playlist > .list') }

  initialize () {
    this.listenTo(this.collection, 'add', this.addOne, this)
    this.listenTo(this.collection, 'reset', this.render, this)
  }

  render () {
    this.$el.empty()
    this.addAll()
  }

  addOne (song) {
    var songView = new Song({ model: song })
    this.$el.append(songView.render().el)
  }

  addAll () {
    this.collection.forEach(this.addOne, this)
  }
}

export default List
