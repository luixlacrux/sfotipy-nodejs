import Backbone from 'backbone'
import template_login from 'src/client/templates/login/login.html'
import template_signIn from 'src/client/templates/login/sign_in.html'
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
  }

  render (template) {
    this.$form.html(template())
    this.$form.fadeIn(800)
    this.$el.animate({ scrollTop: `${650}px` }, 1000)
  }

  showLogin (ev) {
    this.$form
      .attr('action', '/home/login')
      .fadeOut(500, () => {
        this.render(template_login)
      })
  }

  showSignIn (ev) {
    this.$form
      .attr('action', '/home/signup')
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
