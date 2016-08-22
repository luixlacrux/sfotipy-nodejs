import Backbone from 'backbone'
import $ from 'jquery'
import template from 'src/client/handlebars/Header/profile.hbs'
import app from 'src/client/backbone/router'

class Profile extends Backbone.View {
  get tagName () { return 'div' }
  get className () { return 'user' }
  get events () {
    return {
      'click': 'show',
      'click .item .nav': 'navigate',
      'click .item .logout': 'logout'
    }
  }

  initialize () {
    this.model.fetchData().then(this.render.bind(this))
    this.listenTo(this.model, 'change', this.render, this)
    this.hide = this.hide.bind(this)
  }

  render () {
    let user = this.model.toJSON()
    this.$el.html(template(user))
    this.$dropdown = this.$el.find('.dropdown')
    return this
  }

  show (ev) {
    ev.stopPropagation()
    document.addEventListener('click', this.hide)
    this.$dropdown.fadeToggle(300)
  }

  hide () {
    document.removeEventListener('click', this.hide)
    this.$dropdown.fadeOut(300)
  }

  navigate (ev) {
    ev.preventDefault()
    let link = $(ev.target).attr('href')
    app.navigate(link, { trigger: true })
  }
}

export default Profile