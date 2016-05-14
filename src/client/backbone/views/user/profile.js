import Backbone from 'backbone'
import Handlebars from 'handlebars'
import template from 'src/client/templates/user/profile.hbs'
import $ from 'jquery'

class ProfileView extends Backbone.View {
  get el () { return $('#content') }

  get events () {
    return {
      'click .btn-edit': 'navigate'
    }
  }

  initialize () {
    console.log('profile')
  }

  render () {
    this.$el.empty()
    let model = {
      'username': '@mdelacruz',
      'name': 'Moises De La Cruz',
      'email': 'moiseslacruz16@gmail.com'
    }
    this.$el.html(template(model))
  }

  navigate (ev) {
    ev.preventDefault()
    Sfotipy.navigate(`/@moisesdelacruz18/edit`, { trigger: true })
  }
}

export default ProfileView
