import Backbone from 'backbone'
import $ from 'jquery'

class Main extends Backbone.View {
  get el () { return 'body' }
  get events () { 
    return {
      'click': 'hideMenu',
      'click .menu': 'stopEvent',
      'click .button-menu': 'showMenu'
    }
  }

  initialize () {
    this.$menu = $('.menu')
  }

  stopEvent (ev) {
    ev.stopPropagation()
  }

  showMenu (ev) {
    ev.preventDefault()
    this.$menu.animate({
      left: '0px'
    }, 500)
    ev.stopPropagation()
  }

  hideMenu (ev) {
    console.log(ev.offsetX)
    this.$menu.animate({
      left: '-80%'
    }, 500)
  }

}

export default Main