import Backbone from 'backbone'
import $ from 'jquery'
import template from 'src/client/handlebars/Search/user.hbs'
import app from 'src/client/backbone/router'

class UserView extends Backbone.View {
  get tagName () { return 'article' }
  get className () { return 'Search-item' }
  get events () {
    return {
      'click': 'navigate'
    }
  }

  render () {
    this.$el.html(template(this.model.attributes))
    return this
  }

  navigate () {
    const { username } = this.model.attributes
    app.navigate(`@${username}`, { trigger: true })
  }
}

export default UserView
