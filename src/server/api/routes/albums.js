import { saveAlbum, getAlbums, deleteAlbum } from 'src/server/lib/saveAlbum'

export default function (apiRoute, app) {
  app.route(`${apiRoute}/following/albums`)
    // save album
    .post((req, res) => {
      let data = {
        userId: req.user.id,
        album: req.body.album.id
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