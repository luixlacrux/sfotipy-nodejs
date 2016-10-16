export default function (sequelize, DataTypes) {
  return sequelize.define('album', {
    id: {
       type: DataTypes.STRING,
       unique: true,
       primaryKey: true,
       allowNull: false
     },
     name: {
       type: DataTypes.STRING,
       allowNull: false
     },
     artist: {
       type: DataTypes.STRING,
       allowNull: false
     },
     id_artist: {
       type: DataTypes.STRING,
       allowNull: false
     },
     cover: {
       type: DataTypes.STRING,
       allowNull: false
     },
     type: {
       type: DataTypes.STRING,
       allowNull: false
     }
  })
}
