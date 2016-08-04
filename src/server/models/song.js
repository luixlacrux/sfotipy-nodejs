export default function (sequelize, DataTypes) {
  return sequelize.define('song', {
    // song
    name: DataTypes.STRING,
    artist: DataTypes.STRING,
    song: DataTypes.STRING,
  })
}
