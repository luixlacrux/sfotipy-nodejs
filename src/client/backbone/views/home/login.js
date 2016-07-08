import Backbone from 'backbone'
import template_login from 'src/client/templates/login/login.hbs'
import template_signIn from 'src/client/templates/login/sign_in.hbs'
import $ from 'jquery'

class Login extends Backbone.View {
  get el () { return $('body#login') }
  get events () {
    return {
      'click .id-login': 'navigate',
      'click .id-create': 'navigate'
    }
  }

  initialize () {
    this.$form = $('#form')
    this.$portada = this.$el.find('.portada')
  }

  render (template) {
    this.$form.html(template())
    this.$form.fadeIn(800)
    this.$el.animate({ scrollTop: this.$portada.get(0).scrollHeight }, 1000)
  }

  showLogin (ev) {
    this.$form
      .fadeOut(500, () => {
        this.render(template_login)
      })
  }

  showSignIn (ev) {
    this.$form
      .fadeOut(500, () => {
        this.render(template_signIn)
      })
  }

  navigate (ev) {
    ev.preventDefault()
    let $elem = ev.target
    if ( $elem.className === 'id-login')
      Sfotipy.navigate('/home/login', { trigger: true })
    else
      Sfotipy.navigate('/home/signup', { trigger: true })
  }
}

export default Login
