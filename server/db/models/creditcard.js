const db = require('../db')
const Sequelize = require('sequelize')

// OB/LM: watch out storing sensitive data
const CreditCard = db.define(
  'creditcard',
  {
    // OB/LM: inconsistent naming convention
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
  // OB/LM: this might help, it might be unnecessary
  {schema: 'private'}
)

module.exports = CreditCard
