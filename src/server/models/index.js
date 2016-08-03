import Sequelize from 'sequelize'
import configDB from 'src/server/config/database'
import { native as pg } from 'pg'
import pghstore from 'pg-hstore'

const sequelize = new Sequelize(configDB.url)

const User = sequelize.import('./user.js')
const PlayList = sequelize.import('./playlist.js')
//const Song = sequelize.import('./song.js')

// Relation of PlayList
User.hasMany(PlayList, {
  as: 'Playlists', // para que se agregen estos metodos al modelo getPlaylists() y setPlaylists()
  onDelete: 'cascade' // para que al borrar un usuario se borren sus playlists
})
PlayList.belongsTo(User, { as: 'user' }) // no es foreignKey: 'userId' ya que el automagicamente lo hace

// // Ralation of Song
// PlayList.hasMany(Song)
// Song.belongsTo(PlayList, {as: 'playlist', foreignKey: 'playlistId'})
sequelize.sync()
export { User, PlayList }
