import express from 'express'
import spotify from 'spotify-finder'

const router = express.Router()  
const client = spotify.createClient()
const ids = ['3zXjR3y2dUWklKmmp6lEhy','3qsdWsIePeTOvpsRJV5yQB',
            '56yYgfX6M5FlpETfyZSHkn','0zAsh6hObeNmFgFPrUiFcP']

router.get('/search/:query', (req, res) => {
  let query = req.params.query

  client.search(query, 'all', 6, (err, data) => {
    if (err) return res.sendStatus(500).json(err)

    res.json(data)
  })
})

router.get('/top-albums', (req, res) => {
  client.getAlbums(ids, (err, data) => {
    if (err) return res.sendStatus(500).json

    res.json(data.albums)
  })
})

export default router