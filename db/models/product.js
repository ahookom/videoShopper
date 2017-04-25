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
  // rating: {
  //   type: Sequelize.VIRTUAL,
  //   get: function() {
  //     // console.log('in rating get', 'this is', this, 'and reviewsArr is', this.reviewsArr)
  //     let reviewArr = this.reviewsArr
  //     return reviewArr.reduce((accum, review) => accum+=review.stars, 0)/reviewArr.length
  //   }
  // },
  // reviewsArr: {
  //   type: Sequelize.VIRTUAL,
  //   get: function() {
  //     db.model('review').findAll({where: {product_id: this.id}}).then(reviews=>reviews)
  //   }
  // },
  tags: {
    type: Sequelize.ARRAY(Sequelize.STRING),
    defaultValue: [],
    set: function(tags = []) {
      tags = typeof tags !== 'string' ? tags : tags.split(',').map(str => str.trim())
      this.setDataValue('tags', tags)
    }
  }
  // ,
  // rating: {
  //   type: Sequelize.DECIMAL
  // }
})

module.exports.associations = (Product, {Order, Purchase, Review, Category}) => {
  Product.hasMany(Purchase)
  Product.hasMany(Review)
  Product.belongsTo(Category)
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
