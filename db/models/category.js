'use strict'

var Sequelize = require('sequelize')

module.exports = db => db.define('category', {
  title: {
    type: Sequelize.STRING,
    allowNull: false
  },
  description: {
    type: Sequelize.STRING
  },
  imageURL: {
    type: Sequelize.STRING,
    defaultValue: 'http://affportal.net/wp-content/uploads/2015/09/800X500-Bundle.jpg'
  },
  frontEndRoute: {
    type: Sequelize.STRING,
    defaultValue: 'products'
  }
})

module.exports.associations = (Category, {Product}) => {
  Category.hasMany(Product)
}
