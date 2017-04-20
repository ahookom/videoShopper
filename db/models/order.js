'use strict'

var Sequelize = require('sequelize')

module.exports = db => db.define('order', {
  status: {
    type: Sequelize.ENUM('inCart', 'placed', 'completed', 'shipped', 'delivered'),
    allowNull: false
  },
  deliveryDay: {
    type: Sequelize.DATEONLY,
    allowNull: false,
  }
})

module.exports.associations = (Order, {User, Product, Purchase}) => {
  Order.belongsTo(User)
  Order.belongsToMany(Product, {through: Purchase})
}
