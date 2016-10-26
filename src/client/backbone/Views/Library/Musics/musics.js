import Backbone from 'backbone'
import $ from 'jquery'
import MusicView from './music'

class MusicsView extends Backbone.View {
  get el () { return $('section.Library') }

  initialize () {
    this.listenTo(this.collection, 'add', this.addOne, this)
    this.listenTo(this.collection, 'reset', this.render, this)
  }

  render () {
    this.$el.empty()
    this.addAll()
  }

  addOne (music) {
    let musicView = new MusicView({ model: music, collection: this.collection })
    this.$el.append(musicView.render().el)
  }

  addAll () {
    this.collection.forEach(this.addOne, this)
  }
}

export default MusicsView
