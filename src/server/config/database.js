const NAME = process.env.POSTGRES_DB || 'sfotipy_1'
const USER = process.env.POSTGRES_USER || 'sfotipy'
const PASS = process.env.POSTGRES_PASSWORD || 'sfotipy'

const database = {
  'url': `postgres://${USER}:${PASS}@db:5432/${NAME}`
}

export default database
