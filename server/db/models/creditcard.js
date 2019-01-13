const db = require('../db')
const Sequelize = require('sequelize')

const CreditCard = db.define(
  'creditcard',
  {
    UserName: {
      type: Sequelize.STRING,
      allowNull: false
    },
    CardNumber: {
      type: Sequelize.STRING,
      allowNull: false
    },
    ExpDate: {
      type: Sequelize.STRING,
      allowNull: false
    },
    CVV: {
      type: Sequelize.STRING,
      allowNull: false
    }
  },
  {schema: 'private'}
)

module.exports = CreditCard
