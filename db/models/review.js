'use strict'

var Sequelize = require('sequelize')

module.exports = db => db.define('review', {
  title: {
    type: Sequelize.STRING,
    allowNull: false
  },
  text: {
    type: Sequelize.TEXT
  },
  stars: {
    type: Sequelize.INTEGER
  },
  isActive: {
    type: Sequelize.BOOLEAN,
    defaultValue: true
  }
})

module.exports.associations = (Review, {Product, User}) => {
  Review.belongsTo(User)
  Review.belongsTo(Product)
}
