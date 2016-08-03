export default function (sequelize, DataTypes) {
  return sequelize.define('song', {
    // relation
    playlistId: {
      type: DataTypes.INTEGER,
      model: 'playlist', // <<< Note, its table's name, not object name
      key: 'id' // <<< Note, its a column name
    },
    // song
    id_song: DataTypes.STRING
  })
}
