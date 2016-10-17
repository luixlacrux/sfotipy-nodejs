import { followArtist, getArtists, unfollowArtist } from 'src/server/lib/followArtist'

export default function (apiRoute, app) {
  app.route(`${apiRoute}/following/artists`)
    // Follow Artist
    .post((req, res) => {
      let user = req.user
      let artist = {
        id: req.body.artist.id,
        name: req.body.artist.name,
        cover: req.body.artist.cover
      }
      followArtist(artist, user)
        .then(data => res.json(data))
        .catch(err => res.send(err))
    })

    // Get Artists
    .get((req, res) => {
      let user = req.user.id
      getArtists(user)
        .then(data => res.json(data))
        .catch(err => res.send(err))
    })

  // Route of detail
  app.route(`${apiRoute}/following/artist/:id`)
    .delete((req, res) => {
      let user = req.user.id
      let artist = req.params.id
      unfollowArtist(artist, user)
        .then(data => res.json(data))
        .catch(err => res.send(err))
    })

}
