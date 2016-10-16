import { saveAlbum, getAlbums, deleteAlbum } from 'src/server/lib/saveAlbum'

export default function (apiRoute, app) {
  app.route(`${apiRoute}/following/albums`)
    // save album
    .post((req, res) => {
      let user = req.user
      let data = {
        id: req.body.album.id,
        name: req.body.album.name,
        artist: req.body.album.artist,
        id_artist: req.body.album.id_artist,
        cover: req.body.album.cover,
        type: req.body.album.type
      }
      saveAlbum(data, user)
        .then(data => res.json(data))
        .catch(err => res.send(err))
    })

    // Get albums
    .get((req, res) => {
      let user = req.user.id
      getAlbums(user)
        .then(data => res.json(data))
        .catch(err => res.send(err))
    })

  app.route(`${apiRoute}/following/album/:id`)
    .delete((req, res) => {
      let user = req.user.id
      let album = req.params.id
      deleteAlbum(album, user)
        .then(data => res.json(data))
        .catch(err => res.send(err))
    })
}
