import Backbone from 'backbone'
import $ from 'jquery'
// Views
import ArtistView from 'src/client/backbone/Views/Artist/artist'
// tamplate of handlebars
import Artist from 'src/client/handlebars/Artist/main.hbs'
// Artist Model
import ArtistModel from 'src/client/backbone/Models/Artist'
// Collection
import TracksCollection from 'src/client/backbone/Collections/Songs'
import AlbumsCollection from 'src/client/backbone/Collections/Albums'
// import Views
import TopTracksView from 'src/client/backbone/Views/Artist/topTracks'
import AlbumsArtistView from 'src/client/backbone/Views/Artist/albums'
// function
export default function (id) {
  const $app = $('#app')
  const $player = $('#player')
  const artist = new ArtistModel({ url: `/api/artist/${id}` })
  const songs = new TracksCollection({ url: `/api/artist/${id}/top-tracks` })
  const albums = new AlbumsCollection({ url: `/api/artist/${id}/albums` })

  $player.hide()
  $app.empty()
  $app.html(Artist())

  // Obtenemos informacion del artist
  artist.fetchData(id).then(() => {
    const artistView = new ArtistView({ model: artist })
    $app.find('.info-artist').html(artistView.render().el)
  })
  // Obtenemos Canciones Mas Populares
  songs.getSong(id).then(() => {
    const topTracksView = new TopTracksView({ collection: songs })
    topTracksView.render()
  })
  // Obtenemos albums del artista
  albums.getAlbumsArtist(id).then(() => {
    const albumsArtist = new AlbumsArtistView({ collection: albums })
    albumsArtist.render()
  })
}
