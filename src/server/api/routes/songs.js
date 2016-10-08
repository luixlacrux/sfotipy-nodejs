import { newSong, getSong } from 'src/server/lib/createSong'

export default function (apiRoute, app) {
  app.route(`${apiRoute}/song`)

    // Guarda a new song
    .post((req, res) => {
      let data = {
        userId: req.user.id,
        playlistId: req.body.id,
        name: req.body.name,
        artist: req.body.artist,
        song: req.body.song
      }
      newSong(data)
        .then(data => res.json(data))
        .catch(err => res.send(err))
    })
}
