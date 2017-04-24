'use strict'

const {Order, Product, User} = require('APP/db')

const {mustBeLoggedIn, forbidden, mustBeAdmin} = require('./auth.filters')

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
        .then(orders => res.json(orders))
        .catch(next)
      }
    })
  .post('/',
    (req, res, next) => {
      const user = req.user || {}
      if (!user) {
        const { shippingAddress, billingAddress, phoneNumber, name, email } = req.body
        user.shippingAddress = shippingAddress
        user.billingAddress = billingAddress
        user.phoneNumber = phoneNumber
        // user.type = 'client'
        user.name = name
        user.email = email
      }
      // User.findOrCreate({where: {user}, defaults: user})
      // .spread((user, created) => {
      User.create(user)
        .then(createdUser => {
          console.log('in findorCreate')
          const orderObj = {status: 'placed', userId: createdUser.id}
          Order.create(orderObj)
        .then(order => res.status(201).json(order))
        .catch(next)
        })
    })
  .param('id', (req, res, next, id) => {
    Order.findById(id)
      .then((foundOrder) => {
        if (!foundOrder) {
          res.sendStatus(404)
        } else {
          if (foundOrder.user_id!==req.user.id && req.user.type!=='admin') {
            res.status(401).send('Only administrators can access other\'s order information.')
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
      res.send(req.order))
  .put('/:id/product/:productId', (req, res, next) => {
    req.order.addProduct(req.params.productId)
    .then(order => {
      res.json(order)
    })
    .catch(next)
  })
  .put('/:id', (req, res, next) => {
    req.order.update(req.body)
      .then((updatedOrder) => res.json(updatedOrder))
      .catch(next)
  })
  .delete('/:id', (req, res, next) => {
    req.order.update({status: 'deleted'})
    .then(res.sendStatus(204))
  })
