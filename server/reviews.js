'use strict'

const {Review} = require('APP/db')

const {mustBeLoggedIn, forbidden} = require('./auth.filters')

module.exports = require('express').Router()
  .get('/',
    (req, res, next) =>
      Review.findAll()
        .then(allReviews => res.json(allReviews))
        .catch(next))
  .post('/',
    (req, res, next) =>{
      console.log('made it to reviews post with body of ', req.body)
      Review.create(req.body)
      .then(review => res.status(201).json(review))
      .catch(next)
    })
  .param('id', (req, res, next, id) => {
    Review.findById(id)
      .then((foundReview) => {
        if (!foundReview) {
          res.sendStatus(404)
        } else {
          req.order = foundReview
          next()
        }
      })
      .catch(next)
  })
  .get('/:id', (req, res, next) => res.send(req.order))
  .put('/:id/product/:productId', (req, res, next)=>{
    req.order.addProduct(req.params.productId)
    .then(order => {
      res.json(order)
    })
    .catch(next)
  })
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
