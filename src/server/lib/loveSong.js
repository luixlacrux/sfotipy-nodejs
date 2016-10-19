import { User, Song } from 'src/server/models'

function loveSong (song, user) {
  return new Promise((resolve, reject) => {
    Song.sync().then(() => {
      Song.findOrCreate({
        where: { id: song.id },
        defaults: song
      }).spread((song, created) => {
        user.addSong(song)
          .then(() => {
            return resolve(`song loved`)
          })
          .catch((err) => {
            reject(err)
          })
      })
    })
  })
}

function getSongsLoved (user_id) {
  return new Promise((resolve, reject) => {
    User.findById(user_id)
      .then((user) => {
        user.getSong()
          .then((songs) => {
            return resolve({ user, songs })
          })
          .catch((err) => {
            reject(`this is the error ${err}`)
          })
      })
  })
}

function deleteSong (songId, userId) {
  return new Promise((resolve, reject) => {
    User.findById(userId)
      .then((user) => {
        Song.findById(songId)
          .then((song) => {
            user.removeSong(song)
            return resolve()
          })
          .catch((err) => {
            reject(`this is the error ${err}`)
          })
      })
  })
}

export { loveSong, getSongsLoved, deleteSong }
