import Backbone from 'backbone'
import Handlebars from 'handlebars'
import template from 'src/client/templates/user/profile.hbs'
import $ from 'jquery'

class ProfileView extends Backbone.View {
  get el () { return $('#content') }

  get events () {
    return {
      'click .btn-edit': 'navigate'
    }
  }

  initialize () {
    this.model.fetchData()
    console.log('profile')
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
  }

  navigate (ev) {
    ev.preventDefault()
    let username = this.model.get('username')
    Sfotipy.navigate(`/@${username}/edit`, { trigger: true })
  }
}

export default ProfileView
