const db = require('../db')
const Sequelize = require('sequelize')

const Order = db.define('orders', {
  details: {
    type: Sequelize.STRING
  },
  price: {
    type: Sequelize.INTEGER
  }
})

module.exports = Order
