const NAME_DB = 'sfotipy_1'
const PASS = process.env.PASSWD
const USER = process.env.USER

const database = {
  'url': `postgres://${USER}:${PASS}@localhost:5432/${NAME_DB}`
}

export default database
