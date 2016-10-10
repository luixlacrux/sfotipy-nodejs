import { newSong, getSong } from 'src/server/lib/createSong'

export default function (apiRoute, app) {
  app.route(`${apiRoute}/song`)

    // Guarda a new song
    .post((req, res) => {
      let data = {
        playlistId: req.body.playlist.id,
        id_song: req.body.song.id,
        name: req.body.song.name,
        song: req.body.song.source,
        duration: req.body.song.duration,
        cover: req.body.song.cover,
        artist: req.body.song.artists[0].name
      }
      newSong(data)
        .then(data => res.json(data))
        .catch(err => res.send(err))
    })
}
