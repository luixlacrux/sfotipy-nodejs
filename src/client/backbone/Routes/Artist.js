import Backbone from 'backbone'
import $ from 'jquery'
// Views
import ArtistView from 'src/client/backbone/Views/Artist/artist'
// tamplate of handlebars
import Artist from 'src/client/handlebars/Artist/main.hbs'
// Artist Model
import ArtistModel from 'src/client/backbone/Models/Artist'
// Collection
import TopTracksCollection from 'src/client/backbone/Collections/topTracks'
// import ArtistCollection from 'src/client/backbone/Collections/Artists'
// import Views
import TopTracksView from 'src/client/backbone/Views/Artist/topTracks'
// function
export default function (id) {
  const $app = $('#app')
  const artist = new ArtistModel({ url: `/api/artist/${id}` })
  // const artists = new ArtistCollection()
  const songs = new TopTracksCollection({ url: `/api/artist/${id}/top-tracks` })

  $app.empty()
  $app.html(Artist())

  artist.fetchData(id).then(() => {
    // artists.addArtist(artist)
    const artistView = new ArtistView({ model: artist })
    $app.find('.info-artist').html(artistView.render().el)
    // Obtenemos Canciones Mas Populares
    songs.getSong(id).then(() => {
      const topTracksView = new TopTracksView({ collection: songs })
      topTracksView.render()
    })
  })
}
