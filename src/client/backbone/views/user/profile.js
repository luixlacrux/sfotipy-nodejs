import Backbone from 'backbone'
import Handlebars from 'handlebars'
import template from 'src/client/templates/user/profile.html'
import $ from 'jquery'

class ProfileView extends Backbone.View {
  get el () { return $('#content') }

  initialize () {
    console.log('profile')
  }

  render () {
    let model = {
      'username': '@mdelacruz',
      'name': 'Moises De La Cruz',
      'email': 'moiseslacruz16@gmail.com'
    }
    this.$el.html(template(model))
  }
}

export default ProfileView
