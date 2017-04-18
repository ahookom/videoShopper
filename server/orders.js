'use strict'

const {Order, Product, User} = require('APP/db')

const {mustBeLoggedIn, forbidden} = require('./auth.filters')

module.exports = require('express').Router()
  .get('/',
    (req, res, next) =>
      Order.findAll()
        .then(orders => res.json(orders))
        .catch(next))
  .post('/',
    (req, res, next) =>{
      console.log('made it to orders post with body of ', req.body)
      Order.create(req.body)
      .then(order => res.status(201).json(order))
      .catch(next)
    })
  .param('id', (req, res, next, id) => {
    Order.findById(id)
      .then((foundOrder) => {
        if (!foundOrder) {
          res.sendStatus(404)
        } else {
          req.order = foundOrder
          next()
        }
      })
      .catch(next)
  })
  .get('/:id',
    (req, res, next) =>
      res.send(req.order))
  .put('/:id',
    // mustBeLoggedIn,
    /* check if admin */
    (req, res, next) => {
      req.order.update(req.body)
       .then((updatedOrder) => res.json(updatedOrder))
       .catch(next)
    })
    .delete('/:id', (req, res, next) => {
      req.order.update({isActive: false})
      .then(res.sendStatus(204))
    })
