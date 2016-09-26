import Backbone from 'backbone'
import $ from 'jquery'
import Share from 'src/client/backbone/Views/Share'
import template from 'src/client/handlebars/Play/player.hbs'
import PlayerMinView from './PlayerMin'
import Song from 'src/client/backbone/Models/Song'

class Player extends Backbone.View {
  get el () { return $('#music > .music') }
  get events () {
    return {
      'click .action.icon-share': 'share',
      'click .action.icon-add': 'add',

      //Controls
      'click .action.gray#play': 'pause',
      'click .action.gray.icon-next': 'changeSong',
      'click .action.gray.icon-prev': 'restart',
      'click .action.gray.icon-random': 'reproRandom',
      'click .action.gray#volume': 'volumeOrMute',
      'dblclick .action.gray.icon-prev': 'changeSong',
      'change  .range-vol': 'volume',
      'mousemove  .range-vol': 'volume',
      'click .progress': 'progressPointer',
      'mousemove .total': 'pointTime',
      'mouseout .total': 'pointTimeOut'
    }
  }

  initialize () {
    this.audio = document.getElementById('audio')
    this.listenTo(this.model, 'change', this.render)
    // definimos el algunos objectos jQuery
    this.$range = this.$el.find('.range-vol')
    this.$buttonVolume = this.$el.find('#volume')
    this.$buttonPlay = this.$el.find('#play')
    // instaciamos un nueva vista playerMin
    // con el modelo y coleccion de esta vista player
    const { model, collection } = this
    this.playerMin = new PlayerMinView({ model, collection })
  }

  render () {
    let song = this.model.toJSON()
    this.$el.find('.image').html(template(song))
    this.$song = $('.playlist ul').find('li')
    this.$song.eq( song.index-1 ).addClass('item-playing')
    this.$song.eq( song.index-1 ).siblings('li').removeClass('item-playing')

    this.$el.append(this.audio)
    this.initEvents()
    this.play()
  }

  initEvents () {
    this.audio.onended = this.changeSong.bind(this)
    this.audio.onvolumechange = this.volumeChanged.bind(this)
    this.audio.addEventListener('timeupdate', this.updateTime.bind(this))
    this.audio.addEventListener('durationchange', this.totalDuration.bind(this))
  }

  play () {
    this.audio.src = this.model.get('source')
    this.audio.play()
  }

  pause () {
    const play = 'icon-play'
    const stop = 'icon-stop'
    const { index } = this.model.attributes

    if (this.audio.paused) {
      this.audio.play()
      this.$song.eq( index-1 ).addClass('item-playing')
      this.$buttonPlay.removeClass(play).addClass(stop)
      this.playerMin.$buttonPlay.removeClass(play).addClass(stop)
    }
    else {
      this.audio.pause()
      this.$song.removeClass('item-playing')
      this.$buttonPlay.removeClass(stop).addClass(play)
      this.playerMin.$buttonPlay.removeClass(stop).addClass(play)
    }
  }

  changeSong (ev) {

    let idx = this.collection.findIndex({
      index: this.model.attributes.index
    })
    let $this = $(ev.target)
    let length = this.collection.length

    if ($this.hasClass('random'))
      idx = this.random(1, length)
    else if ($this.hasClass('icon-next'))
      idx += 1
    else if ($this.hasClass('icon-prev'))
      idx -= 1
    else
      idx += 1

    idx = idx > length - 1 || idx < 1 ? idx = 0 : idx

    let song = this.collection.at(idx).toJSON()
    this.model.set(song)
  }

  reproRandom (ev) {
    $(this.audio).toggleClass('random')
    $(ev.target).toggleClass('isActive')
    $('.action.gray').toggleClass('random')
  }

  random (min, max) {
    return Math.floor(Math.random() * (max - min)) + min
  }

  updateTime () {
    let current = this.audio.currentTime
    let time = this.formaTime(current)
    $('.progress .min').text(time)

    this.progressBar()
  }

  formaTime (duration) {
    let time = Math.round(duration)
    let minutes = Math.floor(time / 60)
    let seconds = time % 60

    seconds = seconds < 10 ? '0' + seconds : seconds
    return `${ minutes }:${ seconds }`
  }

  progressBar () {
    let duration = this.audio.duration
    let current = this.audio.currentTime

    let percentage = (current * 100) / duration
    $('.state').css('width', `${percentage}%`)
  }

  progressPointer (ev) {
    let $this = $('.total')
    let calculate = this.audio.duration * (ev.offsetX / $this.width())
    this.audio.currentTime = calculate
  }

  totalDuration () {
    let duration = this.audio.duration
    let total = this.formaTime(duration)

    $('.progress .max').text(total)
  }

  volume (ev) {
    let vol = parseFloat(ev.target.value)
    this.audio.volume = vol
    // modifica valor del input range de player min
    this.playerMin.$range.val(vol)
  }

  volumeOrMute () {
    if (this.audio.muted) {
      // desactivamos la barra de volumen en los player
      this.playerMin.$range.attr('disabled', false)
      this.$range.attr('disabled', false)
      this.audio.muted = false
    } else {
      // activamos la barra de volumen en los player
      this.playerMin.$range.attr('disabled', true)
      this.$range.attr('disabled', true)
      this.audio.muted = true
    }
  }

  volumeChanged () {
    const mute = 'icon-mute'
    const vol = 'icon-vol'

    if (this.audio.muted || this.audio.volume === 0) {
      // removemos vol y agregamos mute de los dos botones
      this.$buttonVolume.removeClass(vol).addClass(mute)
      this.playerMin.$buttonVolume.removeClass(vol).addClass(mute)
    } else {
      // removemos mute y agregamos vol de los dos botones
      this.$buttonVolume.removeClass(mute).addClass(vol)
      this.playerMin.$buttonVolume.removeClass(mute).addClass(vol)
    }
  }


  pointTime (ev) {
    let $this = $('.progress .total')
    let calculate = this.audio.duration * (ev.offsetX / $this.width())
    let time = this.formaTime(calculate)
    $('.progress .position-mouse')
      .css({
        display: 'block',
        left: ev.offsetX
      })
      .find('.pointTime').text(time)
  }

  pointTimeOut (ev) {
    $('.progress .position-mouse').css('display', 'none')
  }

  restart () {
    this.audio.currentTime = 0
  }

  share () {
    // instancio la nueva vista y la muestro
    // return false para terminar la ejecucion
    let shareView = new Share({ model: this.model})
    shareView.show()
    return false
  }

  add () {
    Sfotipy.events.trigger('playlist', this.model)
    return false
  }
}

export default Player
