Sfotipy.Views.Player = Backbone.View.extend({
  el: $(".music"),

  events:{
    //Player Controls
  	'click .action.gray.icon-play': 'pause',
    'click .action.gray.icon-next': 'changeSong',
    'click .action.gray.icon-prev': 'restart',
    'click .action.gray.icon-random': 'reproRandom',
    'dblclick .action.gray.icon-prev ': 'changeSong',
    'change .range-vol': 'volume',
    
    'click .progress': 'progressPointer',
    
    //'click .action.gray.icon-vol': 'mute',
    'ended': 'changeSong',
  },

  template: Handlebars.compile($("#player-template").html()),

  initialize: function () {
    this.audio = document.createElement('audio')
    this.listenTo(this.model, "change", this.render)
  },

  render: function () {
    this.$el.find('.image').empty()
    var song = this.model.toJSON()
    this.$el.find('.image').html(this.template(song))
    
    this.$el.append( this.audio )
    this.initEvents()
    this.play()
  },
  initEvents: function () {
    //var audio = document.getElementsByTagName('audio')
    //this.audio.addEventListener('ended', console.log(1))
    this.audio.addEventListener('ended', this.endSong)
    this.audio.addEventListener('timeupdate', this.updateTime.bind(this))
    this.audio.addEventListener('durationchange', this.totalDuration.bind(this))
  },

  endSong: function (ev) {
    Sfotipy.app.player.changeSong(ev)
  },

  play: function () {
    this.audio.src = this.model.get("source")
    this.audio.play()
  },
  
  pause: function () {
    if (this.audio.paused)
      this.audio.play()
    else 
      this.audio.pause()
  },

  changeSong: function (ev) {
    var id = this.model.id
    var $this = $(ev.target)
    var length = Sfotipy.app.songs.length
    
    if ($this.hasClass('random')) 
      id = this.random(0, length + 1)
      else if ($this.hasClass('icon-next')) 
        id += 1
      else if ($this.hasClass('icon-prev')) 
        id -= 1
        else 
          id += 1
    
    id = id >= length || id < 1 ? id = 1 : id
    var song = Sfotipy.app.songs.where({ id:id })
    this.model.set( song[0].toJSON() )  
  },

  reproRandom: function (ev) {
    var $audio = $(this.audio)
    var $button = $(ev.target)
    var $actions = $('.action.gray')
    $audio.toggleClass('random')
    $actions.toggleClass('random')  
    $button.toggleClass('isActive')
  },

  random: function (min, max) {
    return Math.floor(Math.random() * (max - min)) + min
  },

  updateTime: function () {
    var current = this.audio.currentTime
    var time = this.formatTime(current)
    $('.progress .min').text(time)

    this.progressBar()
  },

  formatTime: function (param) {
    var time = Math.round( param )
    var minutes = Math.floor( time / 60 )
    var seconds = time % 60

    minutes = minutes < 10 ? '0' + minutes : minutes
    seconds = seconds < 10 ? '0' + seconds : seconds 
    var result = minutes + ":" + seconds

    return result
  },

  progressBar: function () {
    var duration = this.audio.duration
    
    var current = this.audio.currentTime

    var percentage = (current * 100) / duration;
    $('.state').css('width', percentage + '%');
  },

   progressPointer: function (ev) {
    var $this = $('.total') 
    var calculus = this.audio.duration * (ev.offsetX / $this.width())
    this.audio.currentTime = calculus 
  },

  totalDuration: function () {
    var duration = this.audio.duration
    
    var total = this.formatTime(duration)
    $('.progress .max').text(total)
  },

  volume: function (ev) {
    var vol = parseFloat(ev.target.value)
    this.audio.volume = vol
  },

  restart: function () {
    this.audio.currentTime = 0
  },

});
