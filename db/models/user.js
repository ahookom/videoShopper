'use strict'

// bcrypt docs: https://www.npmjs.com/package/bcrypt
const bcrypt = require('bcryptjs')
    , {STRING, VIRTUAL, ENUM} = require('sequelize')

module.exports = db => db.define('users', {
  name: STRING,
  email: {
    type: STRING,
    validate: {
      isEmail: true,
      notEmpty: true,
    },
  },
  type: {
    type: ENUM('admin', 'client', 'talent'),
    defaultValue: 'client',
    allowNull: false
  },
  shippingAddress: {
    type: STRING
  },
  billingAddress: {
    type: STRING
  },
  phoneNumber:  {
    type: STRING
  },
  githubID: {
    type: STRING
  },
  facebookID:{
    type: STRING
  },
  googleID: {
    type: STRING
  },

  // We support oauth, so users may or may not have passwords.
  password_digest: STRING, // This column stores the hashed password in the DB, via the beforeCreate/beforeUpdate hooks
  password: VIRTUAL // Note that this is a virtual, and not actually stored in DB
}, {
  indexes: [{fields: ['email'], unique: true}],
  hooks: {
    beforeCreate: setEmailAndPassword,
    beforeUpdate: setEmailAndPassword,
  },
  instanceMethods: {
    // This method is a Promisified bcrypt.compare
    authenticate(plaintext) {
      return new Promise((resolve, reject) =>
        bcrypt.compare(plaintext, this.password_digest,
          (err, result) =>
            err ? reject(err) : resolve(result))
        )
    }
  }
})

module.exports.associations = (User, {OAuth, Order, Favorite}) => {
  User.hasOne(OAuth)
  //AH: not sure what the line below might do like add methods for searching that we want but it
  //doesn't obviously work right now.
  // User.belongsToMany(Order, {through: 'Purchases', foreignKey: 'purchaser'})
}

function setEmailAndPassword(user) {
  user.email = user.email && user.email.toLowerCase()
  if (!user.password) return Promise.resolve(user)

  return new Promise((resolve, reject) =>
    bcrypt.hash(user.get('password'), 10, (err, hash) => {
      if (err) return reject(err)
      user.set('password_digest', hash)
      resolve(user)
    })
  )
}
