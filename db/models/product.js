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
  },
  tags: {
    type: Sequelize.ARRAY(Sequelize.STRING),
    defaultValue: [],
    set: function(tags = []) {
      tags = typeof tags !== 'string' ? tags : tags.split(',').map(str => str.trim())
      this.setDataValue('tags', tags)
    }
  }
})

module.exports.associations = (Product, {Order, Purchase, Review}) => {
  Product.hasMany(Purchase)
  Product.hasMany(Review)

  Product.belongsToMany(Order, {through: Purchase})
  Product.addScope('client',
    {
      where: {
        isActive: true
      },
      include: [{
        model: Review,
        required: false
      }]
    }
  )
  Product.addScope('admin',
    {
      include: [{
        model: Review,
        required: false
      }]
    }
  )
  // Product.prototype.getRating = function() {
  //   let reviews = this.getReviews()
  //   return reviews.reduce((accumulator, review) => accumulator+=review.stars, 0)/reviews.length
  // }
}
