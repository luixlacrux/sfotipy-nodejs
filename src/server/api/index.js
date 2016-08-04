import endpoint_spotify from 'src/server/api/endpoint_spotify'
import endpoint_users from 'src/server/api/endpoint_users'
import endpoint_playlists from 'src/server/api/endpoint_playlists'
import endpoint_songs from 'src/server/api/endpoint_songs'
import { requestAuthenticated } from 'src/server/lib/middlewares'

export default function (apiRoute, app) {
  // Desactive la authenticacion para poder usar las api derectamente desde un cliente de REST
  // app.all(`${apiRoute}/*`, requestAuthenticated)
  app.all(`${apiRoute}/*`)
  // set endpoints to client of spotify
  endpoint_spotify(apiRoute, app)
  // set endpoints to User's
  endpoint_users(apiRoute, app)

  endpoint_playlists(apiRoute, app)

  endpoint_songs(apiRoute, app)
}
