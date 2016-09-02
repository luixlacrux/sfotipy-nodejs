import Backbone from 'backbone'
import $ from 'jquery'
import template from 'src/client/handlebars/Profile/public.hbs'
import app from 'src/client/backbone/router'


class ProfilePublicView extends Backbone.View {
  get tagName () { return 'section' }
  get className () { return 'Perfil' }
  get id () { return 'profile' }

  render () {
    this.$el.html(template(this.model.attributes))
    return this
  }
}

export default ProfilePublicView
