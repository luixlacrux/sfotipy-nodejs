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
      'mousemove  .range-vol': 'volume',
      'click #volume': 'volumeOrMute',
    }
  }

  initialize () {
    this.listenTo(this.model, 'change', this.render, this)
    console.log('player min')
    this.$player = $('.music .padding .play')
    // los definimos para usarlo en la vista player
    this.$range = this.$el.find('.range-vol')
    this.$buttonVolume = this.$el.find('#volume')
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
    const audio = window.audio
    // value de input range player-min
    let vol = parseFloat(ev.target.value)
    // modifica estado de input range de player
    this.$player.find('.range-vol')[0].value = vol
    // Modifica volumen de audio
    audio.volume = vol
  }

  volumeOrMute () {
    this.$player.find('#volume').click()
  }
}

export default PlayerMin
