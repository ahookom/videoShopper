'use strict'

var Sequelize = require('sequelize')

module.exports = db => db.define('product', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  description: {
    type: Sequelize.TEXT
  },
  price: {
    type: Sequelize.INTEGER
  },
  leadTime: {
    type: Sequelize.INTEGER
  },
  imageURL: {
    type: Sequelize.STRING
  },
  isActive: {
    type: Sequelize.BOOLEAN,
    defaultValue: true
  }
})


module.exports.associations = (Product, {Order}) => {
  Product.belongsToMany(Order, {through: 'Purchases'})
}
