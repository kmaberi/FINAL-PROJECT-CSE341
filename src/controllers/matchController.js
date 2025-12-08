const Match = require('../models/Match')

async function list(req, res) {
  const matches = await Match.find().populate('team1').populate('team2')
  res.json(matches)
}

async function get(req, res) {
  const m = await Match.findById(req.params.id).populate('team1').populate('team2')
  if (!m) return res.status(404).json({ message: 'Not found' })
  res.json(m)
}

async function create(req, res) {
  const m = await Match.create(req.body)
  res.status(201).json(m)
}

async function update(req, res) {
  const m = await Match.findByIdAndUpdate(req.params.id, req.body, { new: true })
  if (!m) return res.status(404).json({ message: 'Not found' })
  res.json(m)
}

async function remove(req, res) {
  const m = await Match.findByIdAndDelete(req.params.id)
  if (!m) return res.status(404).json({ message: 'Not found' })
  res.json({ success: true })
}

module.exports = { list, get, create, update, remove }

