const NAME = process.env.NAME_DB || 'sfotipy_1'
const PASS = process.env.PASS_DB || 'sfotipy'
const USER = process.env.USER_DB || 'sfotipy'

const database = {
  'url': `postgres://${USER}:${PASS}@localhost:5432/${NAME}`
}

export default database
