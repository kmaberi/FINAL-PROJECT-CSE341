const jwt = require('jsonwebtoken')

function protect(req, res, next) {
  const header = req.headers.authorization || ''
  const parts = header.split(' ')
  if (parts.length === 2 && parts[0] === 'Bearer') {
    try {
      const decoded = jwt.verify(parts[1], process.env.JWT_SECRET || 'devsecret')
      req.user = decoded
      return next()
    } catch (e) {
      return res.status(401).json({ message: 'Invalid token' })
    }
  }
  res.status(401).json({ message: 'No token' })
}

function authorize(roles = []) {
  return (req, res, next) => {
    if (!req.user) return res.status(401).json({ message: 'Unauthorized' })
    const allowed = Array.isArray(roles) ? roles : [roles]
    if (allowed.length === 0 || allowed.includes(req.user.role)) return next()
    res.status(403).json({ message: 'Forbidden' })
  }
}

module.exports = { protect, authorize }

