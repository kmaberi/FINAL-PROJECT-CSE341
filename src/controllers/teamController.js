const Team = require('../models/Team')

async function list(req, res) {
  const teams = await Team.find()
  res.json(teams)
}

async function get(req, res) {
  const t = await Team.findById(req.params.id)
  if (!t) return res.status(404).json({ message: 'Not found' })
  res.json(t)
}

async function create(req, res) {
  const t = await Team.create(req.body)
  res.status(201).json(t)
}

async function update(req, res) {
  const t = await Team.findByIdAndUpdate(req.params.id, req.body, { new: true })
  if (!t) return res.status(404).json({ message: 'Not found' })
  res.json(t)
}

async function remove(req, res) {
  const t = await Team.findByIdAndDelete(req.params.id)
  if (!t) return res.status(404).json({ message: 'Not found' })
  res.json({ success: true })
}

module.exports = { list, get, create, update, remove }

