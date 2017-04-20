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
  .get('/',
    (req, res, next) =>
      Review.findAll()
        .then(allReviews => res.json(allReviews))
        .catch(next))
  .post('/product/:productId/',
    mustBeLoggedIn,
    (req, res, next) => {
      //console.log('made it to reviews post with body of ', req.body)
      let review
      Review.create(req.body)
      .then(createdReview => {
        review = createdReview
        return review.setProduct(req.params.productId)
      })
      .then(reviewWithProductID => {
        return review.setUser(req.params.user.id)
      })
      .then(review => res.status(201).json(review))
      .catch(next)
    })
  .get('/:id', (req, res, next) => res.send(req.review))
  .put('/:id/product/:productId/', (req, res, next) => {
    req.review.setProduct(req.params.productId)
    .then(review => {
      res.json(review)
    })
    .catch(next)
  })
  .put('/:id/user/:userId/', (req, res, next) => {
    req.review.setUser(req.params.userId)
    .then(review => {
      res.json(review)
    })
    .catch(next)
  })
  .delete('/:id', (req, res, next) => {
    req.review.update({isActive: false})
    .then(res.sendStatus(204))
  })


//   routerOtter.get('/:otterId/addFamily/:familyId', (req, res, next) => {
//   let otter;
//   Otter.findById(req.params.otterId)
//     .then((foundOtter) => {
//       otter = foundOtter;
//       return Family.findById(req.params.familyId);
//     })
//     .then((foundFamily) => {
//       otter.setFamily(foundFamily);
//       res.sendStatus(200);
//     })
//     .catch(next);
// });
