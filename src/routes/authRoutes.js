const express = require('express')
const { register, login } = require('../controllers/authController')
const passport = require('passport')
const jwt = require('jsonwebtoken')

const router = express.Router()

router.post('/register', register)
router.post('/login', login)

router.get('/github', passport.authenticate('github', { scope: ['user:email'] }))

router.get(
  '/github/callback',
  passport.authenticate('github', { session: false, failureRedirect: '/' }),
  (req, res) => {
    const token = jwt.sign({ id: req.user._id, role: req.user.role }, process.env.JWT_SECRET || 'devsecret', { expiresIn: '7d' })
    res.json({ token })
  }
)

module.exports = router
