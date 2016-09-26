import $ from 'jquery'
import AlbumModel from 'src/client/backbone/Models/Album'
import app from 'src/client/backbone/router'

export default async function (id, index=1) {
  const $app = $('#app')
  const $player = $('#player')
  const $playerMin = $('#player-min')
  const albumModel = new AlbumModel({ url: `/api/album/${id}` })

  const playingView = app.playingView
  const currentAlbumId = playingView.collection.getAlbumId()

  // vaciamos app y mostramos player
  $app.empty()
  $player.show()
  // ocultamos playerMin
  $playerMin.hide()

  // si el id conincide con en el actual album finalizamos
  // la ejecuccion retornado false
  if (currentAlbumId === id) {
    return false
  }

  try {
    // obtenemos los datos del album
    // lo agregamos a la collection
    const album = await albumModel.fetchData(id)
    playingView.collection.addSongs(album)
    // iniciamos la reproduccion
    playingView.autoplay(parseInt(index - 1))
  } catch(err) {
    // si se produce un error en el request
    console.error(err)
  }
}
