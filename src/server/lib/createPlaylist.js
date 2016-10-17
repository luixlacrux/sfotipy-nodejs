import { User, PlayList, Song } from 'src/server/models'

function newPlaylist (playlist, user) {
  return new Promise((resolve, reject) => {
    PlayList.sync().then(() => {
      let data = {
        id: PlayList.guid(),
        userId: playlist.userId,
        title: playlist.title,
        username: playlist.username
      }
      PlayList.create(data)
        .then((playlist) => {
          user.addPlaylist(playlist)
            .then(() => {
              return resolve(`success, playlist created, ${playlist}`)
            })
            .catch((err) => {
              reject(`this is the error ${err}`)
            })
        })
    })
  })
}

function getPlaylist (user_id) {
  return new Promise((resolve, reject) => {
    User.findById(user_id).then(user => {
        user.getPlaylist() // Este el metodo que se crea al hacer la relacion HasMany y asignandole un nombre
          .then(playlists => resolve({ user, playlists }))
      })
      .catch(err => {
        reject(`this is the error ${err}`)
      })
  })
}

function detailPlaylist (playlist_id) {
  return new Promise((resolve, reject) => {
    PlayList.findById(playlist_id).then((playlist) => {
      playlist.getSong()
      .then((songs) => {
        resolve({ playlist, songs })
      })
    })
    .catch(err => {
      reject(`this is the error ${err}`)
    })
  })
}

export { newPlaylist, getPlaylist, detailPlaylist }
