import { PlayList, Song } from 'src/server/models'

function newSong (song, playlist_id) {
  return new Promise((resolve, reject) => {
    Song.sync().then(() => {
      Song.findOrCreate({
        where: { id: song.id },
        defaults: song
      }).spread((song, created) => {
        PlayList.findById(playlist_id)
          .then((playlist) => {
            playlist.addSong(song)
              .then(() => {
                return resolve(`song loved`)
              })
              .catch((err) => {
                return reject(err)
              })
          })
      })
    })
  })
}

function getSong (playlists_id) {
  return new Promise((resolve, reject) => {
    PlayList.findById(playlists_id)
      .then((playlists) => {
        playlists.getSong() // Este el metodo que se crea al hacer la relacion HasMany y asignandole un nombre
          .then((songs) => resolve({ playlists, songs }))
      })
      .catch(err => {
        reject(`this is the error ${err}`)
      })
  })
}

export { newSong, getSong }
