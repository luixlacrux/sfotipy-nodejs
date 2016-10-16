import { User, Album } from 'src/server/models'
import Spotify from 'spotify-finder'
const client = new Spotify()

function saveAlbum (album, user) {
  return new Promise((resolve, reject) => {
    Album.sync().then(() => {
      Album.findOrCreate({
        where: {id: album.id},
        defaults: album
      }).spread((album, created) => {
        user.addAlbum(album)
          .then(() => {
            return resolve('album saved :)')
          })
          .catch((err) => reject(err))
      })
    })
  })
}

function getAlbums (user_id) {
  return new Promise((resolve, reject) => {
    User.findById(user_id).then(user => {
      user.getAlbum()
        .then((albums) => {
          return resolve({ user, albums })
        })
    })
    .catch((err) => {
      reject(`this is the error ${err}`)
    })
  })
}

function deleteAlbum (albumId, userId) {
  return new Promise((resolve, reject) => {
    User.findById(userId)
      .then((user) => {
        Album.findById(albumId)
          .then((album) => {
            user.removeAlbum(album)
            return resolve()
          })
          .catch((err) => reject(`this is error ${err}`))
      })
  })
}

export { saveAlbum, getAlbums, deleteAlbum }
