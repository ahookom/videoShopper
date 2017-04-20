const mustBeLoggedIn = (req, res, next) => {
  if (!req.user) {
    return res.status(401).send('You must be logged in')
  }
  next()
}

const mustBeAdminOrSelf = (req, res, next) => {
  if (req.user.type!=='admin'&&req.user.id!==req.params.id) {
    res.status(401).send('Only administrators can access other users\'s information.')
  }
  next()
}

const selfOnly = action => (req, res, next) => {
  if (req.params.id !== req.user.id) {
    return res.status(403).send(`You can only ${action} yourself.`)
  }
  next()
}

const forbidden = message => (req, res) => {
  res.status(403).send(message)
}

const mustBeAdmin = (req, res, next) => {
  if (!req.user.type==='admin') return res.status(401).send('You must be an administrator to access this resource')
  next()
}

// Feel free to add more filters here (suggested: something that keeps out non-admins)

module.exports = {mustBeLoggedIn, selfOnly, forbidden, mustBeAdmin, mustBeAdminOrSelf}
