import Backbone from 'backbone'
import $ from 'jquery'
import template from '../../templates/player.html'

class Player extends Backbone.View {
  get el () { return $('.music') }
  get events () {
    return {
      'click .action.gray.icon-play': 'pause',
      'click .action.gray.icon-next': 'changeSong',
      'click .action.gray.icon-prev': 'restart',
      'click .action.gray.icon-random': 'reproRandom',
      'dblclick .action.gray.icon-prev': 'changeSong',
      'change  .range-vol': 'volume',

      'click .progress': 'progressPointer'
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
    var collection = Sfotipy.songs 
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

  restart () {
    this.audio.currentTime = 0
  }
}

export default Player
