import Backbone from 'backbone'
import $ from 'jquery'
// Template
import template from 'src/client/handlebars/Library/main.hbs'

class LibraryView extends Backbone.View {
  get el () { return $('main#app') }
  get events () {
    return {
      'change #order': 'order'
    }
  }

  initialize () {
    this.listenTo(this.model, 'change', this.render, this)
  }

  render () {
    let data = {
      name: this.model.type,
      something: this.model.something
    }
    this.$el.empty()
    this.$el.html(template(data))
  }

  order (e) {
    let value = $(e.target)[0].value
    if (value == 1) {
      $(".Library .song").sort(this.sort_ascending_name).appendTo('.Library')
    }
    else if (value == 2) {
      $(".Library .song").sort(this.sort_ascending_date).appendTo('.Library')
    }
  }

  sort_ascending_name (a, b) {
    return ($(b).find('.name').text()) < ($(a).find('.name').text()) ? 1 : -1
  }

  sort_ascending_date (a, b) {
    return ($(b).find('.author').text()) < ($(a).find('.author').text()) ? 1 : -1
  }
}

export default LibraryView
