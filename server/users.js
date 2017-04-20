'use strict'

const {User} = require('APP/db')

const {mustBeAdminOrSelf, mustBeAdmin, mustBeLoggedIn, forbidden} = require('./auth.filters')

module.exports = require('express').Router()
  .param('id',
    mustBeAdmin,
    (req, res, next, id) => {
      User.findById(id)
      .then((foundUser) => {
        if (!foundUser) {
          res.sendStatus(404)
        } else {
          req.foundUser = foundUser
          next()
        }
      })
      .catch(next)
    })
  .get('/',
    mustBeAdmin,
    (req, res, next) =>
      User.findAll()
      .then(users => res.json(users))
      .catch(next))
  .post('/',
    (req, res, next) => {
      if (req.body.type!=='admin'||req.user.type==='admin') {
        User.create(req.body)
        .then(user => res.status(201).json(user))
        .catch(next)
      }
    })
  .get('/:id',
    (req, res, next) => res.json(req.foundUser)
    )
  .put('/:id',
    (req, res, next) => {
      if (req.user.type!=='admin'&&req.body.type==='admin') {
        forbidden('Only administrators can create admin users')()
      } else {
        User.findById(req.params.id)
        .then(user => user.update(req.body))
        .then(res.send)
        .catch(next)
      }
    })
