'use strict'

const {Product} = require('APP/db')

const {mustBeLoggedIn, forbidden} = require('./auth.filters')

module.exports = require('express').Router()
  .get('/',
    (req, res, next) =>
      Product.findAll()
        .then(products => res.json(products))
        .catch(next))
  .post('/',
    (req, res, next) =>
      Product.create(req.body)
      .then(product => res.status(201).json(product))
      .catch(next))
  .param('id', (req, res, next, id) => {
    Product.findById(id)
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
    (req, res, next) =>
      res.send(req.product))
  .put('/:id',
    mustBeLoggedIn,
    /* check if admin */
    (req, res, next) => {
      req.product.update(req.body)
       .then((updatedProduct) => res.json(updatedProduct))
       .catch(next)
    })
    .delete('/:id', (req, res, next) => {
      req.product.update({isActive: false})
      .then(res.sendStatus(204))
    })
