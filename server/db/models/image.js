const Sequelize = require('sequelize')
const db = require('../db')

const Image = db.define('image', {
  time: {
    type: Sequelize.DATE,
    allowNull: false
  },
  imageUrl: {
    type: Sequelize.STRING
  },
  orientation: {
    type: Sequelize.INTEGER,
    default: 1
  }
})

module.exports = Image
