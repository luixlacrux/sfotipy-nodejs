import Backbone from 'backbone'
import $ from 'jquery'
import template from 'src/client/templates/player/player.html'

class Player extends Backbone.View {
  get el () { return $('.music') }
  get events () {
    return {
      'click .action.icon-share': 'share',
      'click .action.icon-add': 'add',

      //Controls
      'click .action.gray.icon-play': 'pause',
      'click .action.gray.icon-next': 'changeSong',
      'click .action.gray.icon-prev': 'restart',
      'click .action.gray.icon-random': 'reproRandom',
      'dblclick .action.gray.icon-prev': 'changeSong',
      'change  .range-vol': 'volume',
      'mousemove  .range-vol': 'volume',
      'click .progress': 'progressPointer',
      'mousemove .total': 'pointTime',
      'mouseout .total': 'pointTimeOut'
    }
  }

  initialize () {
    this.audio = document.createElement('audio')
    this.listenTo(this.model, 'change', this.render)
  }

  render () {
    this.$el.find('.image').empty()
    let song = this.model.toJSON()
    this.$el.find('.image').html(template(song))
    $('.playlist ul').find('li').eq( song.id-1 ).addClass('item-playing')
    $('.playlist ul').find('li').eq( song.id-1 ).siblings('li').removeClass('item-playing')

    this.$el.append( this.audio )
    this.initEvents()
    this.play()
  }

  initEvents () {
    this.audio.addEventListener('ended', this.endSong)
    this.audio.addEventListener('timeupdate', this.updateTime.bind(this))
    this.audio.addEventListener('durationchange', this.totalDuration.bind(this))
  }

  endSong (ev) {
    Sfotipy.player.changeSong(ev)
  }

  play () {
    this.audio.src = this.model.get('source')
    this.audio.play()
  }

  pause () {
    if (this.audio.paused)
      this.audio.play()
    else
      this.audio.pause()
  }

  changeSong (ev) {
    var id = this.model.id
    var $this = $(ev.target)
    var collection = Sfotipy.playing
    var length = collection.length

    if ($this.hasClass('random'))
      id = this.random(1, length + 1)
      else if ($this.hasClass('icon-next'))
        id += 1
      else if ($this.hasClass('icon-prev'))
        id -= 1
        else
          id += 1

    id = id > length || id < 1 ? id = 1 : id
    let song = collection.where({ id: id })
    this.model.set( song[0].toJSON() )
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
    Sfotipy.events.trigger('share', this.model)
    return false
  }

  add () {
    Sfotipy.events.trigger('playlist', this.model)
    return false
  }
}

export default Player
