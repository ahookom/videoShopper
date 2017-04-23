'use strict'

const {Product} = require('APP/db')

const {mustBeLoggedIn, forbidden, mustBeAdmin} = require('./auth.filters')

module.exports = require('express').Router()
  .get('/',
    (req, res, next) => {
      Product.scope(req.user && req.user.type==='admin' ? 'admin' : 'client').findAll()
        .then(res.json.bind(res))
        .catch(next)
    })
  .post('/',
    mustBeAdmin,
    (req, res, next) =>
      Product.create(req.body)
      .then(product => res.status(201).json(product))
      .catch(next))
  .param('id', (req, res, next, id) => {
    Product.scope(req.user && req.user.type==='admin' ? 'admin' : 'client').findById(id)
      .then((foundProduct) => {
        if (!foundProduct) {
          res.sendStatus(404)
        } else {
          req.product = foundProduct
          next()
        }
      })
      .catch(next)
  })
  .get('/:id',
    (req, res, next) => res.send(req.product)
    )
  .put('/:id',
    mustBeAdmin,
    (req, res, next) => {
      req.product.update(req.body)
       .then((updatedProduct) => res.json(updatedProduct))
       .catch(next)
    })
  .delete('/:id',
    mustBeAdmin,
    (req, res, next) => {
      req.product.update({isActive: false})
      .then(res.sendStatus(204))
    })
