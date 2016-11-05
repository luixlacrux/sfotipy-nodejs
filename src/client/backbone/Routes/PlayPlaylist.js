import $ from 'jquery'
import PlaylistsCollection from 'src/client/backbone/Collections/Playlists'
import SongsCollection from 'src/client/backbone/Collections/Songs'
import loader from 'src/client/handlebars/Utils/loader.hbs'
import app from 'src/client/backbone/router'

export default async function (id, index) {
  const $player = $('#player')
  const songs = new SongsCollection()
  const playingView = app.playingView
  const currentAlbumId = playingView.collection.getAlbumId()
  const currentSongIndex = playingView.player.model.get('index') || null

  // si el id conincide con en el actual album finalizamos
  // la ejecuccion retornado false
  if (currentAlbumId === id) {
    if ((currentSongIndex - 1) !== index) {
      playingView.autoplay(index)
    }
    else {
      return false
    }
  }

  $player.find('.playlist .list').html(loader())

  try {
    // obtenemos los datos del album
    // lo agregamos a la collection
    const playlist = await getData(id)
    playingView.collection.addSongs(playlist)
    // iniciamos la reproduccion
    playingView.autoplay(index)
  } catch(err) {
    // si se produce un error en el request
    console.error(err)
  }
}

async function getData (id) {
  const url = `/api/playlist/${id}`
  const data = await $.get(url)
  return data
}
