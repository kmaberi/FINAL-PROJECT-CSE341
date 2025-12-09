const Team = require('../models/Team')

async function list(req, res) {
  try {
    const teams = await Team.find()
    res.json(teams)
  } catch (e) {
    res.status(500).json({ message: 'Server error' })
  }
}

async function get(req, res) {
  try {
    const t = await Team.findById(req.params.id)
    if (!t) return res.status(404).json({ message: 'Not found' })
    res.json(t)
  } catch (e) {
    const status = e.name === 'CastError' ? 400 : 500
    res.status(status).json({ message: 'Error' })
  }
}

async function create(req, res) {
  try {
    const t = await Team.create(req.body)
    res.status(201).json(t)
  } catch (e) {
    const status = e.name === 'ValidationError' ? 400 : 500
    res.status(status).json({ message: 'Error' })
  }
}

async function update(req, res) {
  try {
    const t = await Team.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
    if (!t) return res.status(404).json({ message: 'Not found' })
    res.json(t)
  } catch (e) {
    const status = e.name === 'ValidationError' || e.name === 'CastError' ? 400 : 500
    res.status(status).json({ message: 'Error' })
  }
}

async function remove(req, res) {
  try {
    const t = await Team.findByIdAndDelete(req.params.id)
    if (!t) return res.status(404).json({ message: 'Not found' })
    res.json({ success: true })
  } catch (e) {
    const status = e.name === 'CastError' ? 400 : 500
    res.status(status).json({ message: 'Error' })
  }
}

module.exports = { list, get, create, update, remove }
