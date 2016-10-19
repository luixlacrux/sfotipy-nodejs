export default function (sequelize, DataTypes) {
  return sequelize.define('song', {
    // song
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
      unique: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    song: {
      type: DataTypes.STRING,
      allowNull: false
    },
    duration: {
      type: DataTypes.STRING,
      allowNull: false
    },
    cover: {
      type: DataTypes.STRING,
      allowNull: false
    },
    id_album: {
      type: DataTypes.STRING,
      allowNull: false
    },
    album: {
      type: DataTypes.STRING,
      allowNull: false
    },
    id_artist: {
      type: DataTypes.STRING,
      allowNull: false
    },
    artist: {
      type: DataTypes.STRING,
      allowNull: false
    }
  })
}
