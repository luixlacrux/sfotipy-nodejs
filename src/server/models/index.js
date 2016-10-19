import Sequelize from 'sequelize'
import configDB from 'src/server/config/database'
import { native as pg } from 'pg'
import pghstore from 'pg-hstore'

const sequelize = new Sequelize(configDB.url, {
  logging: false // para no mostrar where en consola
})

const User = sequelize.import('./user.js')
const PlayList = sequelize.import('./playlist.js')
const Song = sequelize.import('./song.js')
const Album = sequelize.import('./album.js')
const Artist = sequelize.import('./artist.js')

// Relation of Artist
User.belongsToMany(Artist, { as: 'Artist', through: 'follow_artists' })
Artist.belongsToMany(User, { as: 'User', through: 'follow_artists' })

// Relation of PlayList
User.belongsToMany(PlayList, { as: 'Playlist', through: 'follow_playlist' })
PlayList.belongsToMany(User, { as: 'User', through: 'follow_playlist' })

// Ralation of Song from playlists
PlayList.belongsToMany(Song, { as: 'Song', through: 'song_playlist' })
Song.belongsToMany(PlayList, { as: 'PlayList', through: 'song_playlist' })

// Ralation of Album
User.belongsToMany(Album, { as: 'Album', through: 'follow_albums' })
Album.belongsToMany(User, { as: 'User', through: 'follow_albums' })

// Relation of Songs
User.belongsToMany(Song, { as: 'Song', through: 'love_song' })
Song.belongsToMany(User, { as: 'User', through: 'love_song' })

sequelize.sync()

export { User, PlayList, Song, Album, Artist }
