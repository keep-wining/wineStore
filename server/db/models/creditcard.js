const db = require('../db')
const Sequelize = require('sequelize')

const CreditCard = db.define('creditcard', {
  userName: {
    type: Sequelize.STRING,
    allowNull: false
  }
})

module.exports = CreditCard
