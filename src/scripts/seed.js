const mongoose = require('mongoose')
const dotenv = require('dotenv')
const bcrypt = require('bcryptjs')

const Team = require('../models/Team')
const Player = require('../models/Player')
const Match = require('../models/Match')
const User = require('../models/User')

dotenv.config()

async function run() {
  const uri = process.env.MONGODB_URI || process.env.MONGO_URI || 'mongodb://localhost:27017/football_db'
  const dbName = process.env.DB_NAME || 'football_db'
  console.log('Connecting to MongoDB...')
  await mongoose.connect(uri, { dbName })
  console.log('Connected')

  await Promise.all([
    Team.deleteMany({}),
    Player.deleteMany({}),
    Match.deleteMany({}),
    User.deleteMany({ username: { $in: ['admin', 'user'] } })
  ])

  const teamsData = [
    { name: 'Morocco', country: 'Morocco', coach: 'Walid Regragui' },
    { name: 'Egypt', country: 'Egypt', coach: 'Hossam Hassan' },
    { name: 'Senegal', country: 'Senegal', coach: 'Aliou Cissé' },
    { name: 'Nigeria', country: 'Nigeria', coach: 'Finidi George' },
    { name: 'Cameroon', country: 'Cameroon', coach: 'Marc Brys' },
    { name: 'Algeria', country: 'Algeria', coach: 'Vahid Halilhodžić' },
    { name: 'Ghana', country: 'Ghana', coach: 'Otto Addo' },
    { name: "Côte d'Ivoire", country: "Côte d'Ivoire", coach: 'Jean-Louis Gasset' },
    { name: 'Tunisia', country: 'Tunisia', coach: 'Jalel Kadri' },
    { name: 'South Africa', country: 'South Africa', coach: 'Hugo Broos' }
  ]

  console.log('Seeding teams...')
  const teams = await Team.insertMany(teamsData)
  const teamByName = Object.fromEntries(teams.map(t => [t.name, t._id]))

  const playersData = [
    { name: 'Hakim Ziyech', team: teamByName['Morocco'], position: 'Midfielder' },
    { name: 'Achraf Hakimi', team: teamByName['Morocco'], position: 'Defender' },
    { name: 'Mohamed Salah', team: teamByName['Egypt'], position: 'Forward' },
    { name: 'Sadio Mané', team: teamByName['Senegal'], position: 'Forward' },
    { name: 'Victor Osimhen', team: teamByName['Nigeria'], position: 'Forward' },
    { name: 'André Onana', team: teamByName['Cameroon'], position: 'Goalkeeper' },
    { name: 'Riyad Mahrez', team: teamByName['Algeria'], position: 'Forward' },
    { name: 'Thomas Partey', team: teamByName['Ghana'], position: 'Midfielder' },
    { name: 'Sébastien Haller', team: teamByName["Côte d'Ivoire"], position: 'Forward' },
    { name: 'Wahbi Khazri', team: teamByName['Tunisia'], position: 'Forward' },
    { name: 'Percy Tau', team: teamByName['South Africa'], position: 'Forward' }
  ]

  console.log('Seeding players...')
  await Player.insertMany(playersData)

  const matchesData = [
    { team1: teamByName['Morocco'], team2: teamByName['Egypt'], score: '2-1', date: new Date('2025-01-12') },
    { team1: teamByName['Senegal'], team2: teamByName['Nigeria'], score: '1-1', date: new Date('2025-01-14') },
    { team1: teamByName['Cameroon'], team2: teamByName['Algeria'], score: '0-0', date: new Date('2025-01-16') }
  ]

  console.log('Seeding matches...')
  await Match.insertMany(matchesData)

  const adminHash = await bcrypt.hash('admin123', 10)
  const userHash = await bcrypt.hash('user123', 10)
  console.log('Seeding users...')
  await User.insertMany([
    { username: 'admin', password: adminHash, role: 'admin' },
    { username: 'user', password: userHash, role: 'user' }
  ])

  await mongoose.disconnect()
  console.log('Done')
}

run()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error('Seed failed')
    if (err && err.message) console.error(err.message)
    process.exit(1)
  })
