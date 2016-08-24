import Backbone from 'backbone'
import $ from 'jquery'
import template from 'src/client/handlebars/Search/main.hbs'
import app from 'src/client/backbone/router'

class Search extends Backbone.View {
  get tagName () { return 'section' }
  get className () { return 'Search container' }
  get events () {
    return {
      'submit .Search-form': 'search'
    }
  }

  initialize () {
    this.render()
    this.$input = this.$el.find('.Search-form > input')
  }

  render () {
    this.$el.html(template())
  }

  search (ev) {
    ev.preventDefault()
    const query = this.$input.val().replace(/\s/g, '+')
    app.navigate(`search/${query}`, { trigger: true })
  }

  setQuery (query) {
    this.$input.val(query)
  }

}

export default Search