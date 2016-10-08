import $ from 'jquery'
import AlbumModel from 'src/client/backbone/Models/Album'
import loader from 'src/client/handlebars/Utils/loader.hbs'
import app from 'src/client/backbone/router'

export default async function (id, index) {
  const $player = $('#player')
  const albumModel = new AlbumModel({ url: `/api/album/${id}` })
  const playingView = app.playingView
  const currentAlbumId = playingView.collection.getAlbumId()
  const currentSongIndex = playingView.player.model.get('index') || null

  // si el id conincide con en el actual album finalizamos
  // la ejecuccion retornado false
  if (currentAlbumId === id) {
    if ((currentSongIndex - 1) !== index) {
      playingView.autoplay(index)
    }

    return false
  }

  $player.find('.playlist .list').html(loader())

  try {
    // obtenemos los datos del album
    // lo agregamos a la collection
    const album = await albumModel.fetchData(id)
    playingView.collection.addSongs(album)
    // iniciamos la reproduccion
    playingView.autoplay(index)
  } catch(err) {
    // si se produce un error en el request
    console.error(err)
  }

}
