import { User, Album } from 'src/server/models'
import Spotify from 'spotify-finder'
const client = new Spotify()

function saveAlbum (album) {
  return new Promise((resolve, reject) => {
    Album.sync().then(() => {
      Album.create(album)
        .then((data) => {
          resolve(`success, album saved, ${data}`)
        })
        .catch((err) => {
          reject(`this is the error ${err}`)
        })
    })
  })
}

function getAlbums (user_id) {
  let ids = ''
  return new Promise((resolve, reject) => {
    User.findById(user_id).then(user => {
      user.getAlbums()
        .then((albums) => {
          albums.forEach((album) => {
            ids += `${album.album},`
          })
          ids = ids.slice(0, -1)
          if (ids) {
            client.getAlbums(ids)
              .then(data => {
                let albums = data.albums
                resolve({ user, albums })
              })
          }
          else {
            let albums = []
            return resolve({ user, albums })
          }
        })
    })
    .catch((err) => {
      reject(`this is the error ${err}`)
    })
  })
}

function deleteAlbum (id) {
  return new Promise((resolve, reject) => {
    Album.destroy({
      where: {
        album: id
      }
    }).then(result => {
      resolve(result)
    })
    .catch((err) => {
      reject(err)
    })
  })
}

export { saveAlbum, getAlbums, deleteAlbum }
