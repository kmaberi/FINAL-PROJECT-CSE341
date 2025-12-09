const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const passport = require('./config/passport')

const teamRoutes = require('./routes/teamRoutes')
const playerRoutes = require('./routes/playerRoutes')
const matchRoutes = require('./routes/matchRoutes')
const authRoutes = require('./routes/authRoutes')
const path = require('path')
const swaggerUi = require('swagger-ui-express')
const swaggerDoc = require('./swagger/swagger.json')

const app = express()

app.use(cors())
app.use(express.json())
app.use(morgan('dev'))
app.use(passport.initialize())

app.get('/', (req, res) => {
  res.json({ status: 'ok' })
})

app.use('/api/teams', teamRoutes)
app.use('/api/players', playerRoutes)
app.use('/api/matches', matchRoutes)
app.use('/api/auth', authRoutes)
app.use('/auth', authRoutes)

app.get('/api/docs.json', (req, res) => {
  res.sendFile(path.join(__dirname, 'swagger', 'swagger.json'))
})
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc))

app.use((err, req, res, next) => {
  const status = err.status || 500
  res.status(status).json({ message: err.message || 'Server error' })
})

module.exports = app

