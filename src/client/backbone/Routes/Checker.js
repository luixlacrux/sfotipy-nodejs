import $ from 'jquery'
import AlbumsCollection from 'src/client/backbone/Collections/Albums'
import ArtistsCollection from 'src/client/backbone/Collections/Artists'
import SongsCollection from 'src/client/backbone/Collections/Songs'

export function albumsChecker () {
  const albums = new AlbumsCollection({ url: `/api/following/albums` })
  albums.getAlbumsSaved().then(() => {
    albums.forEach((album) => {
      Sfotipy.events.trigger('albums:saved', album.id)
    })
  })
}

export function artistsChecker () {
  const artists = new ArtistsCollection({ url: `/api/following/artists` })
  artists.getArtistsSaved().then(() => {
    artists.forEach((artist) => {
      Sfotipy.events.trigger('artists:saved', artist.id)
    })
  })
}

export function songChecker () {
  const songs = new SongsCollection({ url: `/api/love/songs` })
  songs.getSongs()
    .then(() => {
      songs.forEach((song) => {
        Sfotipy.events.trigger('songs:loved', song.id)
      })
    })
}
