import Backbone from 'backbone'
import $ from 'jquery'
import template from 'src/client/handlebars/Share/main.hbs'

class Share extends Backbone.View {
  get el () { return $('.Share') }
  get events () {
    return {
      'click': 'stopEvent',
      'click .Share-close': 'hide'
    }
  }

  initialize () {
    this.hide = this.hide.bind(this)
    this.render()
  }

  render () {
    let song = this.model.toJSON()
    let html = template(song)
    this.$el.html(html)
  }

  show () {
    document.addEventListener('click', this.hide)
    this.$el.animate({ 'right': 0 }, 500)
  }

  hide (ev) {
    if (ev) ev.preventDefault()
    document.removeEventListener('click', this.hide)
    this.$el.animate({ 'right': '-100%' }, 500)
  }

  stopEvent (ev) { ev.stopPropagation() }
}

export default Share
