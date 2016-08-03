import { User, PlayList } from 'src/server/models'

function newPlaylist (playlist) {
  return new Promise((resolve, reject) => {
    PlayList.sync().then(() => {
      let data = {
        userId: playlist.userId,
        title: playlist.title
      }
      PlayList.create(data)
        .then((data) => {
          resolve(`success, playlist created, ${data}`)
        })
        .catch((err) => {
          reject(`this is the error ${err}`)
        })
    })
  })
}

function getPlaylist (user_id) {
  return new Promise((resolve, reject) => {
    User.findById(user_id).then(user => {
        user.getPlaylists() // Este el metodo que se crea al hacer la relacion HasMany y asignandole un nombre
          .then(playlists => reject(playlists))
      })
      .catch(err => {
        reject(`this is the error ${err}`)
      })
  })
}

export { newPlaylist, getPlaylist }
