const Sequelize = require('sequelize')
const db = require('../db')

const Image = db.define('image', {
  timestamp: {
    type: Sequelize.DATE,
    allowNull: false
  },
  imageUrl: {
    type: Sequelize.STRING
  }
})

module.exports = Image
