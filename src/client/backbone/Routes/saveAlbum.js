import $ from 'jquery'
import AlbumModel from 'src/client/backbone/Models/Album'

export function saveAlbum (album) {
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
