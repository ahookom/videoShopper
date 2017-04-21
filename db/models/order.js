'use strict'

var Sequelize = require('sequelize')

module.exports = db => db.define('order', {
  status: {
    type: Sequelize.ENUM('inCart', 'placed', 'completed', 'shipped', 'delivered'), // lots of cart questions; primarily how are you thinking of changing a cart to an order? -- KHAG
    allowNull: false
  },
  deliveryDay: {
    type: Sequelize.DATEONLY,
    allowNull: false,
  } // I would expect a defaultScope to have isActive filtered out. Also where is isActive attribute? http://docs.sequelizejs.com/en/latest/api/model/#scopeoptions-model -- KHAG
})

module.exports.associations = (Order, {User, Product}) => {
  Order.belongsTo(User)
  Order.belongsToMany(Product, {through: 'Purchases'}) // I would consider have an actual table named Purchases - you need quantity of products and purchase price. What if the price changes? -- KHAG
}

// purchase, {
//   quantity: INTEGER,
//   price: DECIMAL
// } -- KHAG