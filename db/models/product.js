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
  } // I would expect a defaultScope to have isActive filtered out -- KHAG
})


module.exports.associations = (Product, {Order}) => {
  Product.belongsToMany(Order, {through: 'Purchases'}) // I would consider have an actual table named Purchases - you need quantity of products and purchase price. What if the price changes? -- KHAG
}
