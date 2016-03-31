import Backbone from 'backbone'
import $ from 'jquery'

class Main extends Backbone.View {
  get el () { return 'body' }
  get events () { 
    return {
      'click': 'hide',
      'click .menu': 'stopEvent',
      'click .share': 'stopEvent',
      'click .button-menu': 'showMenu'
    }
  }

  initialize () {
    this.$menu = $('.menu')
    this.$share = $('.share')
  }

  stopEvent (ev) {
    ev.stopPropagation()
  }

  showMenu (ev) {
    this.stopEvent(ev)
    this.hideShare()
    this.$menu.animate({
      left: '0px'
    }, 500)
    return false
  }

  showShare () {
    this.hideMenu()
    this.$share.animate({
      right: '0px'
    }, 500)
  }

  hide () {
    this.hideMenu()
    this.hideShare()
  }

  hideMenu () {
    this.$menu.animate({
      left: '-80%'
    }, 500)
  }

  hideShare () {
    var width = this.$share.width()
    this.$share.animate({
      right: -width
    }, 500)
  }

}

export default Main
