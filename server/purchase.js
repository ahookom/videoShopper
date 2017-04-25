'use strict'

const {Purchase} = require('APP/db')

const {mustBeLoggedIn, forbidden, mustBeAdmin} = require('./auth.filters')

module.exports = require('express').Router()
  .get('/',
    (req, res, next) => {
      Purchase.findAll()
        .then(res.json.bind(res))
        .catch(next)
    })
  .get('/:orderId',
    mustBeLoggedIn,
    (req, res, next) => {
      if (req.user.type==='admin') {
        Purchase.findAll({
          where: {
            order_id: req.params.orderId
          }
        })
        .then(purchases => res.json(purchases))
        .catch(next)
      } else {
        // Order.findAll({where: {userId: req.user.id}})
        // .then(orders => res.json(orders))
        // .catch(next)
      }
    })