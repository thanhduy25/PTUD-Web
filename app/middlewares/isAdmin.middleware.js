const ApiError = require('../api-error')

async function isAdmin(req, res, next) {
  if (req.user?.role != 'admin') return next(new ApiError(401, 'Action forbidden.'))

  return next()
}

module.exports = isAdmin
