const Player = require('../models/Player')

async function list(req, res) {
  try {
    const players = await Player.find().populate('team')
    res.json(players)
  } catch (e) {
    res.status(500).json({ message: 'Server error' })
  }
}

async function get(req, res) {
  try {
    const p = await Player.findById(req.params.id).populate('team')
    if (!p) return res.status(404).json({ message: 'Not found' })
    res.json(p)
  } catch (e) {
    const status = e.name === 'CastError' ? 400 : 500
    res.status(status).json({ message: 'Error' })
  }
}

async function create(req, res) {
  try {
    const p = await Player.create(req.body)
    res.status(201).json(p)
  } catch (e) {
    const status = e.name === 'ValidationError' ? 400 : 500
    res.status(status).json({ message: 'Error' })
  }
}

async function update(req, res) {
  try {
    const p = await Player.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
    if (!p) return res.status(404).json({ message: 'Not found' })
    res.json(p)
  } catch (e) {
    const status = e.name === 'ValidationError' || e.name === 'CastError' ? 400 : 500
    res.status(status).json({ message: 'Error' })
  }
}

async function remove(req, res) {
  try {
    const p = await Player.findByIdAndDelete(req.params.id)
    if (!p) return res.status(404).json({ message: 'Not found' })
    res.json({ success: true })
  } catch (e) {
    const status = e.name === 'CastError' ? 400 : 500
    res.status(status).json({ message: 'Error' })
  }
}

module.exports = { list, get, create, update, remove }
