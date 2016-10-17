export default function (sequelize, DataTypes) {
  return sequelize.define('playlist', {
    id: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
        unique: true
    },
    // title
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },{
    classMethods: {
      guid: function () {
        function s4() {
          return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1)
            .toUpperCase()
        }
        return s4() + s4() + s4() + s4() + s4()
      }
    }
  })
}
