'use strict'

const {User} = require('APP/db')

const {mustBeAdminOrSelf, mustBeAdmin, mustBeLoggedIn, forbidden} = require('./auth.filters')

module.exports = require('express').Router()
  .get('/',
    // The forbidden middleware will fail *all* requests to list users.
    // Remove it if you want to allow anyone to list all users on the site.
    //
    // If you want to only let admins list all the users, then you'll
    // have to add a role column to the users table to support
    // the concept of admin users.
    mustBeAdmin,
    (req, res, next) =>
      User.findAll()
      .then(users => res.json(users))
      .catch(next))
  .post('/', // are you using this for signup? otherwise this should only be admin. If for signup you need to make sure to call req.logIn (passport method), but you need to make sure it isn't the admin just MAKING a user -- KHAG
    (req, res, next) =>
      User.create(req.body) // now that we have admin status, should we just use the req.body? -- KHAG
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
      .then(user => user.update(req.body)) // now that we have admin status, should we just use the req.body? -- KHAG
      .then(res.send)
      .catch(next)
  })
