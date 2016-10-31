import $ from 'jquery'
import utils from 'src/client/backbone/Utils'
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
import { albumsChecker,
  artistsChecker,
  songChecker } from 'src/client/backbone/Routes/Checker'

// function
export default async function (id) {
  const $app = $('#app')
  const $player = $('#player')

  $player.hide()
  $app.empty()
  $app.html(Artist())

  // Obtenemos toda la informacion del artist
  const data = await getData(id)
  await render($app, data)

  albumsChecker()
  artistsChecker()
  songChecker()
}

async function render ($app, data) {
  const artist = new ArtistModel()
  const songs = new TracksCollection()
  const albums = new AlbumsCollection()

  return new Promise((resolve, reject) => {
    // parsemos info del artista
    // definimos la vista y renderizamos
    artist.setArtist(data.info)
    const artistView = new ArtistView({ model: artist })
    $app.find('.info-artist').html(artistView.render().el)

    // Agregamos cada cancion a la collection
    // definimos la vista y renderizamos
    data.topTracks.tracks.forEach(songs.parseSongTopTrack, songs)
    const topTracksView = new TopTracksView({ collection: songs })
    topTracksView.render()

    // Agregamos cada album a la collection
    // definimos la vista y renderizamos
    data.albums.items.forEach(addAlbum, this)
    const albumsArtistView = new AlbumsArtistView({ collection: albums })
    albumsArtistView.render()

    function addAlbum(album) {
      albums.addAlbumArtist(album, data.info)
    }
    return resolve()
  })
}


async function getData (id) {
  const url = `/api/artist/${id}`
  const key = `artist-${id}`
  const data = utils.cache.load(key)

  if (data) return data

  try {
    const data = await $.get(url)
    utils.cache.save(key, data, 1440)
    return data
  } catch(err) {
    console.error(err)
  }
}
