import { saveAlbum, getAlbums, deleteAlbum } from 'src/server/lib/saveAlbum'

export default function (apiRoute, app) {
  app.route(`${apiRoute}/following/albums`)
    // save album
    .post((req, res) => {
      let data = {
        userId: req.user.id,
        album_id: req.body.album.id,
        name: req.body.album.name,
        artist: req.body.album.artist,
        cover: req.body.album.cover,
        type: req.body.album.type
      }
      saveAlbum(data)
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
      let album = req.params.id
      deleteAlbum(album)
        .then(data => res.json(data))
        .catch(err => res.send(err))
    })
}
