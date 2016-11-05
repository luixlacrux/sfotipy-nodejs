import $ from 'jquery'
import PlayAlbumRoute from './PlayAlbum'
import PlayPlaylistRoute from './PlayPlaylist'

export default async function (type, id, index=1) {
  const $app = $('#app')
  const $player = $('#player')
  const $playerMin = $('#player-min')

  // vaciamos app y mostramos player
  $app.empty()
  $player.show()
  // ocultamos playerMin
  $playerMin.hide()

  if (id) {
    if (type == 'album') PlayAlbumRoute(id, index)
    else PlayPlaylistRoute(id, index)
  } else {
    otherSomeFunction()
  }
}
