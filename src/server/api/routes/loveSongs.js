import { loveSong, getSongsLoved, deleteSong } from 'src/server/lib/loveSong'

export default function (apiRoute, app) {
  app.route(`${apiRoute}/love/songs`)
    // love Song
    .post((req, res) => {
      let user = req.user
      let song = {
        id: req.body.song.id,
        name: req.body.song.name,
        song: req.body.song.song,
        duration: req.body.song.duration,
        cover: req.body.song.cover,
        id_album: req.body.song.id_album,
        album: req.body.song.album,
        id_artist: req.body.song.id_artist,
        artist: req.body.song.artist
      }
      loveSong(song, user)
        .then(data => res.json(data))
        .catch(err => res.send(err))
    })

    // Get songs loved
    .get((req, res) => {
      let user = req.user.id
      getSongsLoved(user)
        .then(data => res.json(data))
        .catch(err => res.send(err))
    })

  app.route(`${apiRoute}/love/song/:id`)
    .delete((req, res) => {
      let user = req.user.id
      let song = req.params.id
      deleteSong(song, user)
        .then(data => res.json(data))
        .catch(err => res.send(err))
    })
}
