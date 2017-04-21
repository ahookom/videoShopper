'use strict'

const {Product} = require('APP/db')

const {mustBeLoggedIn, forbidden} = require('./auth.filters') // use forbidden -- KHAG

module.exports = require('express').Router()
  .get('/',
    (req, res, next) =>
    // maybe different functionality/scopes for admin -- KHAG
      Product.findAll({where: {isActive: true}}) // I would expect this in the defaultScope, and for you to explicitly state when you want nonActive products -- KHAG
        .then(products => res.json(products))
        .catch(next))
  .post('/', // should ANYone be able to do this? -- KHAG
    (req, res, next) =>
      Product.create(req.body)
      .then(product => res.status(201).json(product))
      .catch(next))
  .param('id', (req, res, next, id) => { // I would expect this first  -- KHAG
    Product.findById(id)
      .then((foundProduct) => { // why parens?  -- KHAG
        if (!foundProduct) {
          res.sendStatus(404) // use centralized error handling  -- KHAG
        } else {
          req.product = foundProduct
          next()
        }
      })
      .catch(next)
  })
  .get('/:id',
    (req, res, next) => // 1 line might make most sense here  -- KHAG
      res.send(req.product))
  .put('/:id',
    mustBeLoggedIn, // should it be admin or the user who made it? Maybe handled in param like orders  -- KHAG
    /* check if admin */ // is this something you want to check?  -- KHAG
    (req, res, next) => {
      req.product.update(req.body) // all of req.body is okay? -- KHAG
       .then((updatedProduct) => res.json(updatedProduct)) // why parens on 1 param? -- KHAG
       .catch(next)
    })
    .delete('/:id', (req, res, next) => {
      req.product.update({isActive: false})
      .then(res.sendStatus(204)) // indent this -- KHAG
      // what about catch? -- KHAG
    })
