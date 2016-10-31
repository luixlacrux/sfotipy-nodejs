import { newSong, getSong } from 'src/server/lib/createSong'

export default function (apiRoute, app) {
  app.route(`${apiRoute}/song`)

    // Guarda a new song
    .post((req, res) => {
      let playlist_id = req.body.playlist.id
      let data = {
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
      newSong(data, playlist_id)
        .then(data => res.json(data))
        .catch(err => res.send(err))
    })
}
