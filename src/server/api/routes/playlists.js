import { newPlaylist, getPlaylist, detailPlaylist } from 'src/server/lib/createPlaylist'

export default function (apiRoute, app) {
  app.route(`${apiRoute}/playlist`)

    // Create New PlayList
    .post((req, res) => {
      let data = {
        userId: req.user.id,
        title: req.body.title
      }
      newPlaylist(data)
        .then(data => res.json(data))
        .catch(err => res.send(err))
    })

    // Get PlayLists
    .get((req, res) => {
      let user = req.user.id
      getPlaylist(user)
        .then(data => res.json(data))
        .catch(err => res.send(err))
    })

  app.route(`${apiRoute}/playlist/:id`)
    .get((req, res) => {
      const id = req.params.id
      console.log(id)
      detailPlaylist(id)
      .then(data => res.json(data))
      .catch(err => res.send(err))
    })
}
