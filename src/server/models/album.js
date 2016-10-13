export default function (sequelize, DataTypes) {
  return sequelize.define('album', {
    album: {
      type: DataTypes.STRING,
      allowNull: false
    }
  })
}
