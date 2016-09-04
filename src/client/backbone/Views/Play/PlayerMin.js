import Backbone from 'backbone'
import $ from 'jquery'
import template from 'src/client/handlebars/Play/playerMin.hbs'

class PlayerMin extends Backbone.View {
  get el () { return $('#player-min') }
  get events () {
    return {
      'click .icon-play': 'playOrPause',
      'click .icon-next': 'songNext',
      'click .icon-prev': 'songReset',
      'dblclick .icon-prev': 'songPrev',
      'click .icon-random': 'randomReproduction',
      'change .range-vol': 'volume',
    }
  }

  initialize () {
    this.listenTo(this.model, 'change', this.render, this)
    console.log('player min')
    this.$player = $('.music .padding .play')
  }

  render () {
    console.log('player min render')
    let song = this.model.toJSON()
    this.$el.find('#currentSong').html(template(song))
  }

  playOrPause () {
    this.$player.find('.icon-play').click()
  }

  songNext () {
    this.$player.find('.icon-next').click()
  }

  songPrev () {
    this.$player.find('.icon-prev').dblclick()
  }

  songReset () {
    this.$player.find('.icon-prev').click()
  }

  randomReproduction () {
    this.$player.find('.icon-random').click()
  }

  volume (ev) {
    // Obtiene elemento audio
    let $audio = this.$player.parent().parent().parent()
      .find('.music #audio')[0]
    // value de input range player-min
    let vol = parseFloat(ev.target.value)
    // modifica estado de input range de player
    this.$player.find('.range-vol')[0].value = vol
    // Modifica volumen de audio
    $audio.volume = vol
  }
}

export default PlayerMin
