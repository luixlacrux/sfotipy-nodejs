import Backbone from 'backbone'
import $ from 'jquery'
import template from 'src/client/handlebars/Artist/album.hbs'
import app from 'src/client/backbone/router'

class AlbumView extends Backbone.View {
  get tagName () { return 'article' }
  get className () { return 'album' }
  get events () {
    return {
      'click .btn-save': 'save',
      'click .btn-saved': 'delete',
      'mouseover .btn-saved': 'changeDown',
      'mouseout .btn-saved': 'changeUp',
      'click .btn-play': 'play',
      'click .name': 'show'
    }
  }

  initialize () {
    this.listenTo(this.model, 'change', this.render, this)
    // Checker of albums
    Sfotipy.events.on('albums:saved', (id) => {
      if (id === this.model.toJSON().id) {
        this.$el.find('.btn-save')
          .text('Saved')
          .removeClass('btn-save')
          .addClass('btn-saved')
      }
    })
  }

  render () {
    let album = this.model.toJSON()
    let html = template(album)
    this.$el.html(html)
    return this
  }

  save (e){
    Sfotipy.events.trigger('album:save', this.model.toJSON())
    $(e.target)
      .text('Saved')
      .removeClass('btn-save')
      .addClass('btn-saved')
    return false
  }

  delete (e) {
    Sfotipy.events.trigger('album:delete', this.model.toJSON())
    $(e.target)
      .text('Save')
      .removeClass('btn-saved')
      .addClass('btn-save')
    return false
  }

  changeDown (e) {
    $(e.target).text('Remove')
  }

  changeUp (e) {
    $(e.target).text('Saved')
  }

  play () {
    const id = this.model.id
    app.navigate(`play?album=${id}`, { trigger:true })
    return false
  }

  show () {
    const id = this.model.id
    app.navigate(`album/${id}`, { trigger:true })
    return false
  }
}

export default AlbumView
