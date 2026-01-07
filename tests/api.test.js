const request = require('supertest')
const app = require('../src/app')
const connectDB = require('../src/config/db')

beforeAll(async () => {
  connectDB()
})

describe('GET collections', () => {
  test('GET /api/teams returns 200 and array', async () => {
    const res = await request(app).get('/api/teams')
    expect(res.status).toBe(200)
    expect(Array.isArray(res.body)).toBe(true)
  })

  test('GET /api/players returns 200 and array', async () => {
    const res = await request(app).get('/api/players')
    expect(res.status).toBe(200)
    expect(Array.isArray(res.body)).toBe(true)
  })

  test('GET /api/matches returns 200 and array', async () => {
    const res = await request(app).get('/api/matches')
    expect(res.status).toBe(200)
    expect(Array.isArray(res.body)).toBe(true)
  })
})

describe('GET by id', () => {
  test('GET /api/teams/:id invalid id returns 400 or 404', async () => {
    const res = await request(app).get('/api/teams/invalidid')
    expect([400,404]).toContain(res.status)
  })

  test('GET /api/players/:id invalid id returns 400 or 404', async () => {
    const res = await request(app).get('/api/players/invalidid')
    expect([400,404]).toContain(res.status)
  })

  test('GET /api/matches/:id invalid id returns 400 or 404', async () => {
    const res = await request(app).get('/api/matches/invalidid')
    expect([400,404]).toContain(res.status)
  })
})
