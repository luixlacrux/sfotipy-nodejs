import { newSong, getSong } from 'src/server/lib/createSong'

export default function (apiRoute, app) {
  app.route(`${apiRoute}/song`)

    // Create New PlayList
    .post((req, res) => {
      let data = {
        // Estoy enviando 1 por defecto porque no esta activada la authenticacion
        // userId: req.user.id  << este es el original.
        playlistId: 1,
        name: req.body.name,
        artist: req.body.artist,
        song: req.body.song
      }
      newSong(data)
        .then(data => res.json(data))
        .catch(err => res.send(err))
    })

    // Get PlayList
    .get((req, res) => {
      // let user = req.user.id << este es el original
      let playlists = 1
      getSong(playlists)
        .then(data => res.json(data))
        .catch(err => res.send(err))
    })
}
