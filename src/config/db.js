const mongoose = require('mongoose')

function connectDB() {
  const uri = process.env.MONGODB_URI || process.env.MONGO_URI || 'mongodb://localhost:27017/football_db'
  const dbName = process.env.DB_NAME || 'football_db'
  mongoose.set('strictQuery', true)
  mongoose.connect(uri, { dbName }).catch(() => {})
  mongoose.connection.on('error', () => {})
}

module.exports = connectDB
