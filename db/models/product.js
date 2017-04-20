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
    type: Sequelize.DECIMAL
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
}, {
  defaultScope: {
    where: {
      isActive: true
    }
  },
  scopes: {
    admin: {},
    client: {
      where: {
        isActive: true
      }
    },
    talent: {
      where: {
        isActive: true
      }
    }
  }
})

module.exports.associations = (Product, {Order, Purchase}) => {
  Product.hasMany(Purchase)
  Product.belongsToMany(Order, {through: Purchase})
}
