const mongoose = require('mongoose')

const TeamSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    country: { type: String, required: true },
    coach: { type: String, required: true }
  },
  { timestamps: true }
)

module.exports = mongoose.model('Team', TeamSchema)

