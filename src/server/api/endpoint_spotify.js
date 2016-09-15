import spotify from 'spotify-finder'
import { User } from 'src/server/models'

const client = spotify.createClient()
const ids = ['3zXjR3y2dUWklKmmp6lEhy','3qsdWsIePeTOvpsRJV5yQB',
            '56yYgfX6M5FlpETfyZSHkn','0zAsh6hObeNmFgFPrUiFcP']

export default function (apiRoute, app) {
  app.get(`${apiRoute}/search/:query`, (req, res) => {
    let query = req.params.query

    client.search(query, 'all', 6, (err, data) => {
      if (err) return res.status(500).send(err)

      User.findAll({
        where: { username: { $like: `${query}%`}},
        attributes: ['id', 'username', 'first_name', 'last_name'],
      }).then(users => {
        data.users = users
        res.json(data)
      })

    })
  })

  app.get(`${apiRoute}/top-albums`, (req, res) => {
    client.getAlbums(ids, (err, data) => {
      if (err) return res.status(500).send(err)

      res.json(data.albums)
    })
  })

  app.get(`${apiRoute}/album/:id`, (req, res) => {
    let id = req.params.id

    client.getAlbum(id, { tracks:false }, (err, album) => {
      if (err) return res.status(500).send(err)

      res.json(album)
    })
  })

  app.get(`${apiRoute}/album/:id/tracks`, (req, res) => {
    let id = req.params.id

    client.getAlbum(id, { tracks:true }, (err, tracks) => {
      if (err) return res.status(500).send(err)

      res.json(tracks)
    })
  })

  app.get(`${apiRoute}/artist/:id`, (req, res) => {
    let id = req.params.id

    client.getArtist(id, {}, null, (err, artist) => {
      if (err) return res.status(500).send(err)
      res.json(artist)
    })
  })

  app.get(`${apiRoute}/artist/:id/top-tracks`, (req, res) => {
    let id = req.params.id

    client.getArtist(id, { topTracks: true }, null, (err, artist) => {
      if (err) return res.status(500).send(err)
      res.json(artist)
    })
  })

  app.get(`${apiRoute}/artist/:id/albums`, (req, res) => {
    let id = req.params.id

    client.getArtist(id, { albums: true }, null, (err, artist) => {
      if (err) return res.status(500).send(err)
      res.json(artist)
    })
  })
}
