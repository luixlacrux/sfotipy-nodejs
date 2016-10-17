import { User, Artist } from 'src/server/models'

function followArtist (artist, user) {
  return new Promise((resolve, reject) => {
    Artist.sync().then(() => {
      Artist.findOrCreate({
        where: { id: artist.id },
        defaults: artist
      }).spread((artist, created) => {
        user.addArtist(artist)
          .then(() => {
            return resolve(`following artist`)
          })
          .catch((err) => reject(err))
      })
    })
  })
}

function getArtists (user_id) {
  return new Promise((resolve, reject) => {
    User.findById(user_id)
      .then((user) => {
        user.getArtist()
          .then((artists) => {
            return resolve({ user, artists })
          })
          .catch((err) => {
            reject(`this is the error ${err}`)
          })
      })
  })
}

function unfollowArtist (artistId, userId) {
  return new Promise((resolve, reject) => {
    User.findById(userId)
      .then((user) => {
        Artist.findById(artistId)
          .then((artist) => {
            user.removeArtist(artist)
            return resolve()
          })
          .catch((err) => {
            reject(`this is the error ${err}`)
          })
      })
  })
}

export { followArtist, getArtists, unfollowArtist }
