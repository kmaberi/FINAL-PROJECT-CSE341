const mongoose = require('mongoose')

const MatchSchema = new mongoose.Schema(
  {
    team1: { type: mongoose.Schema.Types.ObjectId, ref: 'Team', required: true },
    team2: { type: mongoose.Schema.Types.ObjectId, ref: 'Team', required: true },
    score: { type: String, default: '' },
    date: { type: Date, required: true }
  },
  { timestamps: true }
)

module.exports = mongoose.model('Match', MatchSchema)

