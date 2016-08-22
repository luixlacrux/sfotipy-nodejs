import Backbone from 'backbone'
import $ from 'jquery'
import app from 'src/client/backbone/router'

class Menu extends Backbone.View {
  get el () { return $('.Header-menu') }
  get events () {
    return {
      'click': 'stopEvent',
      'click .item': 'navigate'
    }
  }

  initialize () { this.hide = this.hide.bind(this) }

  navigate (ev) {
    // ocultamos el menu
    this.hide()
    // obtengo al attributo href del elemento
    let link = $(ev.target).attr('href')
    // si link no contiene la palabra logout
    // navego hacia el link
    if (link.indexOf('logout') === -1) {
      app.navigate(link, { trigger: true })
      ev.preventDefault()
    }
  }

  show () {
    document.addEventListener('click', this.hide)
    this.$el.animate({ left: 0 }, 500)
  }

  hide () {
    document.removeEventListener('click', this.hide)
    this.$el.animate({ left: '-100%' }, 500)
  }

  stopEvent (ev) { ev.stopPropagation() }
}

export default Menu