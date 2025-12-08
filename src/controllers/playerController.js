const Player = require('../models/Player')

async function list(req, res) {
  const players = await Player.find().populate('team')
  res.json(players)
}

async function get(req, res) {
  const p = await Player.findById(req.params.id).populate('team')
  if (!p) return res.status(404).json({ message: 'Not found' })
  res.json(p)
}

async function create(req, res) {
  const p = await Player.create(req.body)
  res.status(201).json(p)
}

async function update(req, res) {
  const p = await Player.findByIdAndUpdate(req.params.id, req.body, { new: true })
  if (!p) return res.status(404).json({ message: 'Not found' })
  res.json(p)
}

async function remove(req, res) {
  const p = await Player.findByIdAndDelete(req.params.id)
  if (!p) return res.status(404).json({ message: 'Not found' })
  res.json({ success: true })
}

module.exports = { list, get, create, update, remove }

