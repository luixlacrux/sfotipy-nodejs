import Backbone from 'backbone'
import $ from 'jquery'
import templateLogin from 'src/client/handlebars/Home/login.hbs'
import templateSignUp from 'src/client/handlebars/Home/signUp.hbs'
import app from 'src/client/backbone/router'

class Home extends Backbone.View {
  get el () { return $('body#home') }
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

  login (ev) {
    this.$form.fadeOut(500, () => this.render(templateLogin))
  }

  signUp (ev) {
    this.$form.fadeOut(500, () => this.render(templateSignUp))
  }

  navigate (ev) {
    ev.preventDefault()
    let elem = ev.target
    if (elem.className === 'id-login') {
      return app.navigate('/home/login', { trigger: true })
    }

    app.navigate('/home/signup', { trigger: true })
  }
}

export default Home
