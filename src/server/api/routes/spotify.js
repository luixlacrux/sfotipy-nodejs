import Spotify from 'spotify-finder'
import { User } from 'src/server/models'
import configAuth from 'src/server/config/auth'

const client = new Spotify(configAuth.spotifyAuth)

export default function (apiRoute, app) {
  app.get(`${apiRoute}/top-albums`, (req, res) => {

    client.browse({ to: 'new-releases' })
      .then(data => res.json(data.albums.items))
      .catch(err => res.status(500).send(err))
  })

  // Albums Routes

  app.get(`${apiRoute}/album/:id`, (req, res) => {
    const { id } = req.params

    client.getAlbum(id, { tracks: false })
      .then(album => res.json(album))
      .catch(err => res.status(500).send(err))
  })

  app.get(`${apiRoute}/album/:id/tracks`, (req, res) => {
    const { id } = req.params

    client.getAlbum(id, { tracks: true })
      .then(tracks => res.json(tracks))
      .catch(err => res.status(500).send(err))
  })

  app.get(`${apiRoute}/albums`, (req, res) => {
    const ids = req.query.ids.split(',')

    client.getAlbums(ids)
      .then(albums => res.json(albums))
      .catch(err => res.status(500).send(err))
  })

  // Search Route

  app.get(`${apiRoute}/search/:query`, async function (req, res) {
    const { query } = req.params

    try {
      const data = await client.search({ q: query, limit: 6 })
      data.users = await User.findAll({
        where: { username: { $ilike: `${query}%` }},
        attributes: ['id', 'username', 'first_name', 'last_name'],
      })

      res.json(data)
    } catch (err) {
      res.status(500).send(err)
    }
  })

  // Artist Route

  app.get(`${apiRoute}/artist/:id`, async function (req, res) {
    const { id } = req.params

    try {
      const info = await client.getArtist(id)
      const topTracks = await client.getArtist(id, { topTracks: true })
      const albums = await client.getArtist(id, { albums: true })

      res.json({ info, topTracks, albums })
    } catch(err) {
      res.status(500).send(err)
    }
  })
}
