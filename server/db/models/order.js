const db = require('../db')
const Sequelize = require('sequelize')

const Order = db.define(
  'orders',
  {
    details: {
      type: Sequelize.STRING
    },
    price: {
      type: Sequelize.INTEGER
    }
  }, // comment the schema: private line below to test
  {schema: 'private'}
)

module.exports = Order
