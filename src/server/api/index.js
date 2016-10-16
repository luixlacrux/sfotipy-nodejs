import spotifyRoutes from 'src/server/api/routes/spotify'
import playlistsRoutes from 'src/server/api/routes/playlists'
import songsRoutes from 'src/server/api/routes/songs'
import usersRoutes from 'src/server/api/routes/users'
import albumsRoutes from 'src/server/api/routes/albums'
import { requestAuthenticated } from 'src/server/lib/middlewares'

export default function (apiRoute, app) {
  // Desactive la authenticacion para poder usar las api derectamente desde un cliente de REST
  app.all(`${apiRoute}/*`, requestAuthenticated)
  // app.all(`${apiRoute}/*`)
  // set endpoints to client of spotify
  spotifyRoutes(apiRoute, app)
  // set endpoints to User's
  usersRoutes(apiRoute, app)

  playlistsRoutes(apiRoute, app)

  songsRoutes(apiRoute, app)

  albumsRoutes(apiRoute, app)
}
