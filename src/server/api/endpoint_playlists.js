import { newPlaylist, getPlaylist } from 'src/server/lib/createPlaylist'

export default function (apiRoute, app) {
  app.route(`${apiRoute}/playlist`)

    // Create New PlayList
    .post((req, res) => {
      let data = {
        // Estoy enviando 1 por defecto porque no esta activada la authenticacion
        // userId: req.user.id  << este es el original.
        userId: 1,
        title: req.body.title
      }
      newPlaylist(data)
        .then((data) => {
          res.json(data)
        })
        .catch((err) => {
          res.send(err)
        })
    })

    // Get PlayList
    .get((req, res) => {
      // let user = req.user.id << este es el original
      let user = 1
      getPlaylist(user)
        .then((data) => {
          res.json(data)
        })
        .catch((err) => {
          res.send(err)
        })
    })
}
