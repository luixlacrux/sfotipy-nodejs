import $ from 'jquery'
import AlbumModel from 'src/client/backbone/Models/Album'

export function saveAlbum (album) {
  const modelAlbum = new AlbumModel({ url: `/api/following/albums` })
  let data = {
    id: album.id,
    name: album.name,
    artist: album.artists ? album.artists[0].name : album.artist,
    cover: album.cover,
    type: album.type
  }
  modelAlbum.saveAlbum(data).then(() => {
    console.log(`${album.name} saved :)`)
  })
  .catch((err) => {
    console.log(`${album.name} not saved :(`)
  })
}

export function deleteAlbum (album) {
  const modelAlbum = new AlbumModel({ url: `/api/following/album/${album.id}` })
  modelAlbum.deleteAlbum().then(() => {
    console.log(`${album.name} deleted :)`)
  })
}
