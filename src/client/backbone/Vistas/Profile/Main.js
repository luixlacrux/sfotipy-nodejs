import Backbone from 'backbone'
import $ from 'jquery'
import template from 'src/client/handlebars/Profile/profile.hbs'
import app from 'src/client/backbone/router'


class ProfileView extends Backbone.View {
  get tagName () { return 'section' }
  get className () { return 'Perfil' }
  get id () { return 'profile' }
  get events () {
    return {
      'click .btn-edit': 'navigate'
    }
  }

  render () {
    this.$el.html(template(this.model.attributes))
    return this
  }

  navigate (ev) {
    ev.preventDefault()
    const { username } = this.model.attributes
    app.navigate(`/@${username}/edit`, { trigger: true })
  }
}

export default ProfileView
