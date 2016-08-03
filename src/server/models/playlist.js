
export default function (sequelize, DataTypes) {
  return sequelize.define('playlist', {
    /* >>>> no es necesario hacerlo asi, claro esta tambien es valido <<<<< */
    // userId: {
    //   type: DataTypes.INTEGER,
    //   model: 'user', // <<< Note, its table's name, not object name
    //   key: 'id' // <<< Note, its a column name
    // },
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
