'use strict'

const {User} = require('APP/db')

const {mustBeAdminOrSelf, mustBeAdmin, mustBeLoggedIn} = require('./auth.filters')

module.exports = require('express').Router()
  .get('/',
    mustBeAdmin,
    (req, res, next) =>
      User.findAll()
      .then(users => res.json(users))
      .catch(next))
  .post('/',
    (req, res, next) =>
      User.create(req.body)
      .then(user => res.status(201).json(user))
      .catch(next))
  .get('/:id',
    mustBeAdminOrSelf,
    (req, res, next) =>
      User.findById(req.params.id)
      .then(user => res.json(user))
      .catch(next))
  .put('/:id',
    mustBeAdminOrSelf,
    (req, res, next) => {
      User.findById(req.params.id)
      .then(user => user.update(req.body))
      .then(res.send)
      .catch(next)
    })
