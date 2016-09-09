import Backbone from 'backbone'
import $ from 'jquery'
import UserView from './user'

class UsersView extends Backbone.View {
  get el () { return $('.Search-users > .list') }

  render () {
    this.$el.empty()
    this.collection.models
      .map(model => new UserView({ model }))
      .forEach(view => {
        view.render()
        view.$el.appendTo(this.$el)
      })

    return this
  }
}

export default UsersView
