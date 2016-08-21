import Backbone from 'backbone'
import $ from 'jquery'
import template from 'src/client/handlebars/profile'

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
    this.listenTo(this.model, 'change:username', this.render, this)
    this.model.fetchData()
  }

  // fetchData () {
  //   if (!Object.keys(this.model.toJSON()).length) {
  //     this.model.fetchData()
  //       .then(this.render.bind(this))
  //   } else {
  //     this.render()
  //   }
  // }

  render () {
    console.log('UserDropdown render')
    this.$el.empty()
    let user = this.model.toJSON()
    this.$el.html(template(user))
    this.$dropdown = this.$el.find('.dropdown')
  }

  show (ev) {
    ev.stopPropagation()
    this.$dropdown.fadeToggle(300)
  }

  hide () {
    this.$dropdown.hide(300)
  }

  navigate (ev) {
    ev.preventDefault()
    let link = $(ev.target).attr('href')
    Sfotipy.navigate(link, { trigger: true })
  }
}