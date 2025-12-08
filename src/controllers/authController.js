const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../models/User')

function signToken(user) {
  return jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET || 'devsecret', { expiresIn: '7d' })
}

async function register(req, res) {
  const { username, password, role } = req.body
  const exists = await User.findOne({ username })
  if (exists) return res.status(400).json({ message: 'Username taken' })
  const hash = await bcrypt.hash(password, 10)
  const user = await User.create({ username, password: hash, role: role || 'user' })
  const token = signToken(user)
  res.status(201).json({ token })
}

async function login(req, res) {
  const { username, password } = req.body
  const user = await User.findOne({ username })
  if (!user) return res.status(400).json({ message: 'Invalid credentials' })
  const ok = await bcrypt.compare(password, user.password)
  if (!ok) return res.status(400).json({ message: 'Invalid credentials' })
  const token = signToken(user)
  res.json({ token })
}

module.exports = { register, login }

