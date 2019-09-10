var crypto = require('crypto')
var Sequelize = require('sequelize')
var db = require('../db')
var User = db.define('user', {
  email: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false
  },
  password: {
    type: Sequelize.STRING,
    // Making `.password` act like a func hides it when serializing to JSON.
    // This is a hack to get around Sequelize's lack of a "private" option.
    get: function() {
      var _this = this
      return function() {
        return _this.getDataValue('password')
      }
    }
  },
  salt: {
    type: Sequelize.STRING,
    // Making `.salt` act like a function hides it when serializing to JSON.
    // This is a hack to get around Sequelize's lack of a "private" option.
    get: function() {
      var _this = this
      return function() {
        return _this.getDataValue('salt')
      }
    }
  },
  googleId: {
    type: Sequelize.STRING
  }
})
module.exports = User
/**
 * instanceMethods
 */
User.prototype.correctPassword = function(candidatePwd) {
  return User.encryptPassword(candidatePwd, this.salt()) === this.password()
}
/**
 * classMethods
 */
User.generateSalt = function() {
  return crypto.randomBytes(16).toString('base64')
}
User.encryptPassword = function(plainText, salt) {
  return crypto
    .createHash('RSA-SHA256')
    .update(plainText)
    .update(salt)
    .digest('hex')
}
/**
 * hooks
 */
var setSaltAndPassword = function(user) {
  if (user.changed('password')) {
    user.salt = User.generateSalt()
    user.password = User.encryptPassword(user.password(), user.salt())
  }
}
User.beforeCreate(setSaltAndPassword)
User.beforeUpdate(setSaltAndPassword)
User.beforeBulkCreate(function(users) {
  users.forEach(setSaltAndPassword)
})
//# sourceMappingURL=user.js.map
