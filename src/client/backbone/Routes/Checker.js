import $ from 'jquery'
import AlbumCollection from 'src/client/backbone/Collections/Albums'

export function albumsChecker () {
  const albums = new AlbumCollection({ url: `/api/following/albums` })
  albums.getAlbumsSaved().then(() => {
    albums.forEach(iterate, this)
    function iterate (album) {
      Sfotipy.events.trigger('following', album.id)
    }
  })
}
