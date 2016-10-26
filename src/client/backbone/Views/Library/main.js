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
    let data = this.model
    this.$el.empty()
    this.$el.html(template(data))
  }

  order (e) {
    let value = $(e.target)[0].value
    if (value == "Name") {
      $(".Library article").sort(this.sort_ascending_name).appendTo('.Library')
    }
    else if (value == "Artist") {
      $(".Library article").sort(this.sort_ascending_artist).appendTo('.Library')
    }
    else if (value == "Date") {
      $(".Library article").sort(this.sort_ascending_date).appendTo('.Library')
    }
  }

  sort_ascending_name (a, b) {
    return ($(b).find('.name').text()) < ($(a).find('.name').text()) ? 1 : -1
  }

  sort_ascending_date (a, b) {
    return ($(b).find('.author').text()) < ($(a).find('.author').text()) ? 1 : -1
  }

  sort_ascending_artist (a, b) {
    return ($(b).find('.artist').text()) < ($(a).find('.artist').text()) ? 1 : -1
  }
}

export default LibraryView
