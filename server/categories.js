'use strict'

const {Category} = require('APP/db')

module.exports = require('express').Router()
  .get('/',
    (req, res, next) => {
      Category.findAll()
        .then(res.json.bind(res))
        .catch(next)
    })
