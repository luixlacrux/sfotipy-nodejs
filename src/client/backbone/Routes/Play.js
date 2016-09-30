import $ from 'jquery'
import PlayAlbumRoute from './PlayAlbum'

export default async function (id, index=1) {
  index = (parseInt(index) - 1)
  const $app = $('#app')
  const $player = $('#player')
  const $playerMin = $('#player-min')

  // vaciamos app y mostramos player
  $app.empty()
  $player.show()
  // ocultamos playerMin
  $playerMin.hide()

  if (id) {
    PlayAlbumRoute(id, index)
  } else {
    otherSomeFunction()
  }
}
