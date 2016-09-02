import Backbone from 'backbone'
import $ from 'jquery'
import app from 'src/client/backbone/router'

class Search extends Backbone.View {
  get el () { return $('#form-search') }
  get events () {
    return {
      'submit': 'search',
      'click .close-icon': 'clean'
    }
  }

  initialize () {
    this.$input = this.$el.find('.input')
  }
  
  search (ev) {
    ev.preventDefault()
    const query = this.$input.val().replace(/\s/g, '+')
    app.navigate(`search/${query}`, { trigger: true })
  }

  clean () { this.$input.val('') }
}

export default Search