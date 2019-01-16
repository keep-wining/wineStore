const User = require('./user')
const Wine = require('./wine')
const Order = require('./order')
const CreditCard = require('./creditcard')

//Associations
Order.belongsTo(User)
User.hasMany(Order)

CreditCard.belongsTo(User)
User.hasMany(CreditCard)

module.exports = {
  User,
  Wine,
  Order,
  CreditCard
}
