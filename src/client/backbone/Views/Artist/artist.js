import Backbone from 'backbone'
import $ from 'jquery'
import template from 'src/client/handlebars/Artist/artist.hbs'

class ViewArtistView extends Backbone.View {
  get tagName () { return 'span' }
  get className () { return 'artist-element' }

  get events () {
    return {
      'click .btn-follow-artist': 'follow',
      'click .btn-unfollowing-artist': 'unfollowing',
      'mouseover .btn-unfollowing-artist': 'changeDown',
      'mouseout .btn-unfollowing-artist': 'changeUp',
    }
  }

  initialize () {
    this.listenTo(this.model, 'change', this.render, this)
    // Checker of artist
    Sfotipy.events.on('artists:saved', (id) => {
      if (id == this.model.toJSON().id) {
        this.$el.find('.btn-follow-artist')
          .text('Following')
          .removeClass('btn-follow-artist')
          .addClass('btn-unfollowing-artist')
      }
    })
  }

  render () {
    let artist = this.model.toJSON()
    let html = template(artist)
    this.$el.html(html)
    return this
  }

  follow (e) {
    Sfotipy.events.trigger('artist:save', this.model.toJSON())
    $(e.target)
      .text('Following')
      .removeClass('btn-follow-artist')
      .addClass('btn-unfollowing-artist')
    return false
  }

  unfollowing (e) {
    Sfotipy.events.trigger('artist:delete', this.model.toJSON())
    $(e.target)
      .text('Follow')
      .removeClass('btn-unfollowing-artist')
      .addClass('btn-follow-artist')
    return false
  }

  changeDown (e) {
    $(e.target).text('Unfollowing')
  }

  changeUp (e) {
    $(e.target).text('Following')
  }
}

export default ViewArtistView
