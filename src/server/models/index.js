import Sequelize from 'sequelize'
import configDB from 'src/server/config/database'
import { native as pg } from 'pg'
import pghstore from 'pg-hstore'

const sequelize = new Sequelize(configDB.url)

const User = sequelize.import('./user.js')
const PlayList = sequelize.import('./playlist.js')
//const Song = sequelize.import('./song.js')

// Ralation of PlayList
User.hasMany(PlayList)
PlayList.belongsTo(User, {as: 'user', foreignKey: 'userId'})

// // Ralation of Song
// PlayList.hasMany(Song)
// Song.belongsTo(PlayList, {as: 'playlist', foreignKey: 'playlistId'})

export { User, PlayList }
