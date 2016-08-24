import $ from 'jquery'
// Main template
import Search from 'src/client/handlebars/Search/main.hbs'
// Artists
import ArtistsCollections from 'src/client/backbone/Colecciones/Artists'
import ArtistsView from 'src/client/backbone/Vistas/Search/Artists'
// Albums
import AlbumsCollections from 'src/client/backbone/Colecciones/Albums'
import AlbumsView from 'src/client/backbone/Vistas/Search/Albums'
// Songs
import SongsCollections from 'src/client/backbone/Colecciones/Songs'
import SongsView from 'src/client/backbone/Vistas/Search/Songs'

export default function (query) {
  // Defino la url con el query
  const url = `/api/search/${query}`
  const $app = $('#app')
  const $player = $('#player')
  // instancio las collecciones
  const artists = new ArtistsCollections()
  const albums = new AlbumsCollections()
  const songs = new SongsCollections()

  // vaciamos app, ocultamos el player
  // y renderizamos la vista search
  $player.hide()
  $app.html(Search({ query }))

  $.get(url).done(res => {
    // obtengo la data, y ejecuto renderView
    const artistsData = res.artists.items
    renderView(artistsData, artists, ArtistsView, artists.addArtist)
    
    const albumsData = res.albums.items
    renderView(albumsData, albums, AlbumsView, albums.addAlbum)

    const songsData = res.tracks.items
    renderView(songsData, songs, SongsView, songs.addSongMoreInfo)

  }).error(console.log)

}

function renderView (data, collection, ClassView, addMethod) {
  // Recorro la data y la agrego a la coleccion
  // paso la instancia de la colleccion como contexto
  data.forEach(addMethod, collection)
  // instancio una nueva vista, con los datos de la colleccion y renderizo
  const view = new ClassView({ collection })
  view.render()
}