
export default function (sequelize, DataTypes) {
  return sequelize.define('playlist', {
    // relation
    userId: {
      type: DataTypes.INTEGER,
      model: 'user', // <<< Note, its table's name, not object name
      key: 'id' // <<< Note, its a column name
    },
    // uid
    uid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV1,
      primaryKey: true
    },
    // title
    title: DataTypes.STRING
  })
}
