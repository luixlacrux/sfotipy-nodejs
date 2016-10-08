// import Router from './routers/router'
import app from './router'
import $ from 'jquery'
import Backbone from 'backbone'
import _ from 'underscore'

$(() => {
  // iniciamos la aplicacion
  window.Sfotipy = app
  Sfotipy.events = {}
  _.extend(Sfotipy.events, Backbone.Events)
  Sfotipy.init()
})
