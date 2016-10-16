import $ from 'jquery'
import AlbumModel from 'src/client/backbone/Models/Album'

export function saveAlbum (data) {
  let artist = data.artists ? data.artists[0] : data.artist
  let album = {
    id: data.id,
    name: data.name,
    artist: artist.name ? artist.name : artist,
    id_artist: artist.id ? artist.id : data.id_artist,
    cover: data.cover,
    type: data.type
  }
  const modelAlbum = new AlbumModel({ url: `/api/following/albums` })
  modelAlbum.saveAlbum(album).then(() => {
    console.log(`${album.name} saved :)`)
  })
  .catch((err) => {
    console.log(`${err.status}\n${album.name} not saved :(`)
  })
}

export function deleteAlbum (album) {
  const modelAlbum = new AlbumModel({ url: `/api/following/album/${album.id}` })
  modelAlbum.deleteAlbum().then(() => {
    console.log(`${album.name} deleted :)`)
  })
}
