import $ from 'jquery'
import PlayAlbumRoute from './PlayAlbum'
import loader from 'src/client/handlebars/Utils/loader.hbs'

export default async function (id, index=1) {
  const $app = $('#app')
  const $player = $('#player')
  const $playerMin = $('#player-min')

  // vaciamos app y mostramos player
  $app.empty()
  $player.show()
  // ocultamos playerMin
  $playerMin.hide()

  if (id) {
    $player.find('.playlist .list').html(loader())
    PlayAlbumRoute(id, index)
  } else {
    otherSomeFunction()
  }
}
