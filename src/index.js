const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const dotenv = require('dotenv')
dotenv.config()
const connectDB = require('./config/db')
const passport = require('./config/passport')

const app = express()

app.use(cors())
app.use(express.json())
app.use(morgan('dev'))
app.use(passport.initialize())

connectDB()

app.get('/', (req, res) => {
  res.json({ status: 'ok' })
})

const teamRoutes = require('./routes/teamRoutes')
const playerRoutes = require('./routes/playerRoutes')
const matchRoutes = require('./routes/matchRoutes')
const authRoutes = require('./routes/authRoutes')

app.use('/api/teams', teamRoutes)
app.use('/api/players', playerRoutes)
app.use('/api/matches', matchRoutes)
app.use('/api/auth', authRoutes)
app.use('/auth', authRoutes)

app.use((err, req, res, next) => {
  const status = err.status || 500
  res.status(status).json({ message: err.message || 'Server error' })
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {})
