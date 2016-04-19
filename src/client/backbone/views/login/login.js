import Backbone from 'backbone'
import template_login from 'src/client/templates/login/login.html'
import template_signIn from 'src/client/templates/login/sign_in.html'
import $ from 'jquery'

class Login extends Backbone.View {
  get el () { return $('.Home-loginBasic') }
  get events () {
    return {
      'click #login': 'showLogin',
      'click #sign-in': 'showSignIn'
    }
  }

  initialize () {
    this.$form = $('#form')
  }

  render (template) {
    this.$form.html(template())
    this.$form.fadeIn(800)
  }

  showLogin (ev) {
    ev.preventDefault()
    this.$form
      .fadeOut(500, () => {
        this.render(template_login)
      })
  }

  showSignIn (ev) {
    ev.preventDefault()
    this.$form
      .fadeOut(500, () => {
        this.render(template_signIn)
      })
  }
}

export default Login
