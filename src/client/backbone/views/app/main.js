import Backbone from 'backbone'
import $ from 'jquery'

class Main extends Backbone.View {
  get el () { return 'body' }
  get events () { 
    return {
      'submit #form-search': 'searchDesktop',
      'submit .search-mobile' : 'searchMobileOne',
      'submit .Search-form' : 'searchMobileTwo',
      'click': 'hide',
      'click .Header-menu': 'stopEvent',
      'click .Share': 'stopEvent',
      'click .Header-btnMenu': 'showMenu'
    }
  }

  initialize () {
    this.$menu = $('.Header-menu')
    this.$share = $('.Share')
    this.$music = $('#music')
    this.$albums = $('#albums')
    this.$search = $('.Search')
    this.$inputSearchDesktop = $('#form-search').find('.input')
    this.$inputSearchMobileOne = $('.search-mobile').find('input') 
    this.$inputSearchMobileTwo = $('.Search-form').find('input') 
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

  hideMusic () {
    this.$music.hide()
    this.$albums.hide()
  }

  showMusic () {
    this.$music.show()
    this.$albums.show()
  }

  hideSearch () {
    this.$search.hide()
  }

  showSearch (query) {
    this.$inputSearchDesktop.val(query)
    this.$search.show()
  }

  searchDesktop (ev) {
    let query = this.$inputSearchDesktop.val()
    this.search(query)
    return false
  }

  searchMobileOne (ev) {
    let query = this.$inputSearchMobileOne.val()
    this.$inputSearchMobileTwo.val(query)
    this.search(query)
    this.hideMenu()
    return false
  }

  searchMobileTwo (ev) {
    let query = this.$inputSearchMobileTwo.val()
    this.$inputSearchMobileOne.val(query)
    this.search(query)
    return false
  }

  search (query) {
    Sfotipy.navigate(`search/${query}`, { trigger: true })
  }
}

export default Main
