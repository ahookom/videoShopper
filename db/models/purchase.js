'use strict'

var Sequelize = require('sequelize')

module.exports = db => db.define('purchase', {
  quantity: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 1
  },
  purchasePrice: {
    type: Sequelize.DECIMAL
  }
})

module.exports.associations = (Purchase, {Order, Product}) => {
  Purchase.belongsTo(Order)
}
