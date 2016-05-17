import Sequelize from 'sequelize'
import configDB from 'src/server/config/database'
import { native as pg } from 'pg'
import pghstore from 'pg-hstore'

const sequelize = new Sequelize(configDB.url)

const User = sequelize.import('./user.js')

export default User
