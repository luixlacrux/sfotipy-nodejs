import Backbone from 'backbone'
import $ from 'jquery'
import ProfileView from './Profile'
import MenuView from './Menu'
import ProfileModel from 'src/client/backbone/Modelos/Profile'

class Main extends Backbone.View {
  get el () { return $('.Header') }
  get events () {
    return {
      'click .Header-btnMenu': 'showMenu'
    }
  }

  initialize () {
    this.menu = new MenuView()
    this.$container = this.$el.find('.container')
    this.$menu = this.$el.find('.Header-menu')
    this.$title = this.$el.find('.Header-title')
    this.render()
  }

  render () {
    let profile = new ProfileView({ model: new ProfileModel })
    this.$container.prepend(profile.el)
  }

  showMenu (ev) {
    ev.preventDefault()
    ev.stopPropagation()
    this.menu.show()
  }

  setTitle(section) { this.$title.html(section) }
}

export default Main