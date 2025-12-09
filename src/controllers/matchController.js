const Match = require('../models/Match')

async function list(req, res) {
  try {
    const matches = await Match.find().populate('team1').populate('team2')
    res.json(matches)
  } catch (e) {
    res.status(500).json({ message: 'Server error' })
  }
}

async function get(req, res) {
  try {
    const m = await Match.findById(req.params.id).populate('team1').populate('team2')
    if (!m) return res.status(404).json({ message: 'Not found' })
    res.json(m)
  } catch (e) {
    const status = e.name === 'CastError' ? 400 : 500
    res.status(status).json({ message: 'Error' })
  }
}

async function create(req, res) {
  try {
    const m = await Match.create(req.body)
    res.status(201).json(m)
  } catch (e) {
    const status = e.name === 'ValidationError' ? 400 : 500
    res.status(status).json({ message: 'Error' })
  }
}

async function update(req, res) {
  try {
    const m = await Match.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
    if (!m) return res.status(404).json({ message: 'Not found' })
    res.json(m)
  } catch (e) {
    const status = e.name === 'ValidationError' || e.name === 'CastError' ? 400 : 500
    res.status(status).json({ message: 'Error' })
  }
}

async function remove(req, res) {
  try {
    const m = await Match.findByIdAndDelete(req.params.id)
    if (!m) return res.status(404).json({ message: 'Not found' })
    res.json({ success: true })
  } catch (e) {
    const status = e.name === 'CastError' ? 400 : 500
    res.status(status).json({ message: 'Error' })
  }
}

module.exports = { list, get, create, update, remove }
