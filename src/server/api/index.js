import endpoint_spotify from 'src/server/api/endpoint_spotify'
import endpoint_users from 'src/server/api/endpoint_users'
import { requestAuthenticated } from 'src/server/lib/middlewares'

export default function (apiRoute, app) {

  app.all(`${apiRoute}/*`, requestAuthenticated)
  // set endpoints to client of spotify
  endpoint_spotify(apiRoute, app)
  // set endpoints to User's
  endpoint_users(apiRoute, app)
}
