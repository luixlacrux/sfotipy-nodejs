import bcrypt from 'bcrypt-nodejs'

export default function (sequelize, DataTypes) {
  return sequelize.define('user', {
    // First Name
    first_name: DataTypes.STRING,
    // Last Name
    last_name: DataTypes.STRING,
    // User's local
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    email: {
      type: DataTypes.STRING,  
      unique: true,
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
      },
      fullName: function () {
        return `${this.first_name} ${this.last_name}`
      }
    }
  })
}


