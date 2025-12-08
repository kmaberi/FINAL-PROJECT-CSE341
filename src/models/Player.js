const mongoose = require('mongoose')

const PlayerSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    team: { type: mongoose.Schema.Types.ObjectId, ref: 'Team', required: true },
    position: { type: String, required: true }
  },
  { timestamps: true }
)

module.exports = mongoose.model('Player', PlayerSchema)

