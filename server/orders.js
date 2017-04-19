'use strict'

const {Order, Product, User} = require('APP/db')

const {mustBeLoggedIn, forbidden, mustBeAdmin} = require('./auth.filters') // you don't use forbidden or mustBeAdmin, why do you require it in? -- KHAG

module.exports = require('express').Router()
  .get('/',
    mustBeLoggedIn,
    (req, res, next) => {
      if (req.user.type==='admin') { 
        Order.findAll() 
        .then(orders => res.json(orders))
        .catch(next)
      } else {
        Order.findAll({where: {userId: req.user.id}})
        .then(orders => res.json(orders)) // this seems really redundant -- KHAG
        .catch(next)
      }
      // try instead
      // let query ={}
      // if (notAdmin) {where....}
      // once! Order.findAll(query) -- KHAG
    })
  .post('/',
    (req, res, next) => {
      const user = req.user // what about admin making order for someone else -- KHAG
      if (!user) {
        // object.assign might clean this up (be careful of just using req.body if you do this) -- KHAG
        const { shippingAddress, billingAddress, phoneNumber, name, email } = req.body
        user.shippingAddress = shippingAddress
        user.billingAddress = billingAddress
        user.phoneNumber = phoneNumber
        user.type = 'client'
        user.name = name
        user.email = email
      }
      User.findOrCreate({where: {user}})
      .spread((user, created) => { // we aren't using the second param so we don't actually need to define it -- KHAG
        Order.create({...req.body, user}) // does this work? I thought it was es7 not es6. es6 spread only works on iterables -- KHAG
        .then(order => res.status(201).json(order))
        .catch(next)
      })
    })
  .param('id', (req, res, next, id) => { // I would expect this at the top, but it doesn't need to be -- KHAG
    Order.findById(id)
      .then((foundOrder) => {
        if (!foundOrder) {
          res.sendStatus(404) // use error handling middleware -- KHAG
        } else {
          if (foundOrder.userId!==req.user.id && req.user.type!=='admin') {
            res.status(401).send('Only administrators can access other\'s order information.') // I would think you would mutate the adminOrSelf utility function (DRY code). Also use error handling middleware -- KHAG
          } else {
            req.order = foundOrder
            next()
          }
        }
      })
      .catch(next)
  })
  .get('/:id',
    (req, res, next) =>
      res.send(req.order)) // seems like it might be more readable on 1 line -- KHAG
  .put('/:id/product/:productId', (req, res, next) => {
    req.order.addProduct(req.params.productId)
    .then(order => { // why have brackets for 1 line here when you don't above? -- KHAG
      res.json(order)
    })
    .catch(next)
  })
  .put('/:id', // who can update orders? maybe a util of admin or own order? -- KHAG
    // mustBeLoggedIn,
    /* check if admin */
    (req, res, next) => {
      req.order.update(req.body) // should a user be able to update EVERYTHING about an order? No, they shouldn't -- KHAG
       .then((updatedOrder) => res.json(updatedOrder)) // why parens around 1 param? You don't do that elsewhere -- KHAG
       .catch(next)
    })
    .delete('/:id', (req, res, next) => {
      req.order.update({isActive: false})
      .then(res.sendStatus(204)) // indent me -- KHAG
      // catch me!!  -- KHAG
    })
