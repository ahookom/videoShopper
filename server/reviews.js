'use strict'

const {Review} = require('APP/db')

const {mustBeLoggedIn, forbidden, mustBeAdminOrSelf} = require('./auth.filters')

module.exports = require('express').Router()
  .param('id', (req, res, next, id) => {
    Review.findById(id)
      .then((foundReview) => {
        if (!foundReview) {
          res.sendStatus(404)
        } else {
          req.review = foundReview
          next()
        }
      })
      .catch(next)
  })
  .get('/', (req, res, next) => Review.findAll()
    .then(allReviews => res.json(allReviews))
    .catch(next))
  .get('/:id', (req, res, next) => res.send(req.review))
  .post('/product/:productId/', mustBeLoggedIn, (req, res, next) => {
    let review
    Review.create(req.body)
    .then(createdReview => {
      review = createdReview
      return review.setProduct(req.params.productId)
    })
    .then(reviewWithProductID => {
      return review.setUser(req.user.id)
    })
    .then(review => res.status(201).json(review))
    .catch(next)
  })
  .put('/:id/product/:productId', mustBeAdminOrSelf, (req, res, next) => {
    const {title, text, stars, isActive} = req.body
    Review.findById(req.params.id)
    .then(foundReview => {
      return foundReview.updateAttributes({title, text, stars, isActive})
    })
    .then(updatedReview => updatedReview.setProduct(req.params.productId))
    .then(updatedProductId => res.status(201).json(updatedProductId))
    .catch(next)
  })
  .delete('/:id', (req, res, next) => {
    req.review.update({isActive: false})
    .then(res.sendStatus(204))
  })
