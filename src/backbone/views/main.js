import Backbone from 'backbone'
import $ from 'jquery'

class Main extends Backbone.View {
  get el () { return 'body' }
  get events () { 
    return {
      'submit #form-search': 'search',
      'click': 'hide',
      'click .Header-menu': 'stopEvent',
      'click .Share': 'stopEvent',
      'click .Header-btnMenu': 'showMenu'
    }
  }

  initialize () {
    this.$menu = $('.Header-menu')
    this.$share = $('.Share')
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

  search (ev) {
    ev.preventDefault()
    let query = $('#form-search').find('.input').val()   
    Sfotipy.navigate(`search/?q=${query}`, {trigger:true})
    return false
  }

}

export default Main
