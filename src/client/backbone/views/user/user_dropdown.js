import Backbone from 'backbone'
import $ from 'jquery'
import template from 'src/client/templates/user/dropdown.hbs'

class UserDropdown extends Backbone.View {
  get el () { return $('.user') }
  get events () {
    return {
      'click': 'showDrop',
      'click .item .nav': 'navigate',
      'click .item .logout': 'logout'
    }
  }

  initialize () {
    this.listenTo(this.model, 'change', this.render, this)
    this.fetchData()
  }

  fetchData () {
    if (!Object.keys(this.model.toJSON()).length) {
      this.model.fetchData()
        .then(this.render.bind(this))
    } else {
      this.render()
    }
  }

  render () {
    this.$el.empty()
    let user = this.model.toJSON()
    this.$el.html(template(user))
    this.$dropdown = this.$el.find('.dropdown')
  }

  showDrop (ev) {
    ev.stopPropagation()
    this.$dropdown.fadeToggle(300)
  }

  hideDrop () {
    this.$dropdown.hide(300)
  }

  navigate (ev) {
    ev.preventDefault()
    let link = $(ev.target).attr('href')
    Sfotipy.navigate(`${link}`, { trigger: true })
  }
}

export default UserDropdown
