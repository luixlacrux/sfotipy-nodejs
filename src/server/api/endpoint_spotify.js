import spotify from 'spotify-finder'

const client = spotify.createClient()
const ids = ['3zXjR3y2dUWklKmmp6lEhy','3qsdWsIePeTOvpsRJV5yQB',
            '56yYgfX6M5FlpETfyZSHkn','0zAsh6hObeNmFgFPrUiFcP']

export default function (apiRoute, app) {
  app.get(`${apiRoute}/search/:query`, (req, res) => {
    let query = req.params.query

    client.search(query, 'all', 6, (err, data) => {
      if (err) return res.sendStatus(500).json(err)

      res.json(data)
    })
  })

  app.get(`${apiRoute}/top-albums`, (req, res) => {
    client.getAlbums(ids, (err, data) => {
      if (err) return res.sendStatus(500).json(err)

      res.json(data.albums)
    })
  })
}
