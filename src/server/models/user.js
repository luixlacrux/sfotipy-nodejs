import bcrypt from 'bcrypt-nodejs'

export default function (sequelize, DataTypes) {
  return sequelize.define('user', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
        unique: true
    },
    // First Name
    first_name: DataTypes.STRING,
    // Last Name
    last_name: DataTypes.STRING,
    // User's local
    username: {
      type: DataTypes.STRING,
      unique: true
    },
    email: {
      type: DataTypes.STRING,
      unique: true
    },
    password: DataTypes.STRING,
    // User's facebook
    facebookid: DataTypes.STRING,
    facebooktoken : DataTypes.STRING,
    // User's twitter
    twitterid: DataTypes.STRING,
    twittertoken: DataTypes.STRING
  },{
    classMethods: {
      generateHash: function (password) {
        return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null)
      }
    },
    instanceMethods: {
      validPassword: function (password) {
        return bcrypt.compareSync(password, this.password)
      }
    },
    getterMethods: {
      someValue: function () {
        return this.someValue
      }
    },
    setterMethods: {
      someValue: function (value) {
        this.someValue = value
      }
    }
  })
}
