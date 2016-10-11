import { User, Album } from 'src/server/models'

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
  return new Promise((resolve, reject) => {
    User.findById(user_id).then(user => {
      user.getAlbums()
        .then(albums => resolve({ user, albums }))
    })
    .catch((err) => {
      reject(`this is the error ${err}`)
    })
  })
}

function deleteAlbum (album_id) {
  return new Promise((resolve, reject) => {
    Album.destroy({
      where: {
        album_id: album_id
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
