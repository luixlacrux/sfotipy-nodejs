import Backbone from 'backbone'
import $ from 'jquery'
// Main template
import Play from 'src/client/handlebars/Play/main.hbs'
// Playing Collection
import PlayingCollection from 'src/client/backbone/Colecciones/Songs'
// Player, List View
import PlayerView from 'src/client/backbone/Vistas/Play/player'
import ListView from 'src/client/backbone/Vistas/Play/list'
// Song, Album Model
import AlbumModel from 'src/client/backbone/Modelos/Album'
import SongModel from 'src/client/backbone/Modelos/Song'

export default function (name, id) {
  const $app = $('#app')
  const $player = $('#player')
  const album = new AlbumModel({ url: `/api/album/${id}` })
  const playing = new PlayingCollection()

  // vaciamos app y mostramos player
  $app.empty()
  $player.show()

  // si el id conincide con el del player finalizamos 
  // la ejecuccion retornado false
  if ($player.data('playid') === id) {
    return false
  }

  // renderisamos el player
  // y guardamos el id 
  $player
    .html(Play())
    .data('playid', id)

  album.fetchData(name, id).then(() => {
    
    // obtenemos el album y lo agregamos a la coleccion
    playing.addSongs(album)

    // instanciamos nueva vista y le pasamos la colleccion  
    const listView = new ListView({ collection: playing })
    // renderizamos la vista
    listView.render()
  })
}