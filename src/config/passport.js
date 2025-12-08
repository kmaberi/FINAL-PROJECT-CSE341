const passport = require('passport')
const GitHubStrategy = require('passport-github2').Strategy
const bcrypt = require('bcryptjs')
const User = require('../models/User')

passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: process.env.GITHUB_CALLBACK_URL || '/auth/github/callback'
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let user = await User.findOne({ githubId: profile.id })
        if (!user) {
          const username = profile.username || (profile.displayName || `github_${profile.id}`)
          const hash = await bcrypt.hash(String(profile.id) + Date.now(), 10)
          user = await User.create({ username, password: hash, role: 'user', githubId: profile.id })
        }
        return done(null, user)
      } catch (e) {
        return done(e)
      }
    }
  )
)

module.exports = passport
