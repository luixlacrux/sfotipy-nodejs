
export default function (sequelize, DataTypes) {
  return sequelize.define('playlist', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
        unique: true
    },
    uid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV1,
      primaryKey: true
    },
    // title
    title: DataTypes.STRING
  })
}
