import Backbone from 'backbone'
import $ from 'jquery'
import template from 'src/client/handlebars/Artist/song'

class SongView extends Backbone.View {
  get tagName () { return 'li' }
  get className () { return 'item' }
  get events () {
    return {
      'click': 'select'
    }
  }

  constructor (opts) {
    super(opts)
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

  select () {
    console.log('Oops!')
  }
}

export default SongView
