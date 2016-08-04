import { PlayList, Song } from 'src/server/models'

function newSong (song) {
  return new Promise((resolve, reject) => {
    Song.sync().then(() => {
      let data = {
        playlistId: song.playlistId,
        name: song.name,
        artist: song.artist,
        song: song.song
      }
      Song.create(data)
        .then((data) => {
          resolve(`success, song created, ${data}`)
        })
        .catch((err) => {
          reject(`this is the error ${err}`)
        })
    })
  })
}

function getSong (playlists_id) {
  return new Promise((resolve, reject) => {
    PlayList.findById(playlists_id)
      .then(playlists => {
        playlists.getSong() // Este el metodo que se crea al hacer la relacion HasMany y asignandole un nombre
          .then(songs => resolve({ playlists, songs }))
      })
      .catch(err => {
        reject(`this is the error ${err}`)
      })
  })
}

export { newSong, getSong }
