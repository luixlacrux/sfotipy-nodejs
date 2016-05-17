import bcrypt from 'bcrypt-nodejs'

export default function (sequelize, DataTypes) {
  return sequelize.define('user', {
    // User's local
    localusername: {
      type: DataTypes.STRING,
      //allowNull: false,
      unique: true
    },
    localemail: {
      type: DataTypes.STRING,
      unique: true
    },
    localpassword: DataTypes.STRING,
    // User's facebook
    facebookid: DataTypes.STRING,
    facebooktoken : DataTypes.STRING,
    facebookemail: DataTypes.STRING,
    facebookname: DataTypes.STRING,
    // User's twitter
    twitterid: DataTypes.STRING,
    twittertoken: DataTypes.STRING,
    twitterdisplayname: DataTypes.STRING,
    twitterusername: DataTypes.STRING
  },{
    classMethods: {
      generateHash: function (password) {
        return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null)
      }
    },
    instanceMethods: {
      validPassword: function (password) {
        return bcrypt.compareSync(password, this.localpassword)
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
