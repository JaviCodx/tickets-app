import { MongoMemoryServer } from 'mongodb-memory-server'
import mongoose from 'mongoose'
import { app } from '../app'
import request from 'supertest'

declare global {
  function signin(): Promise<string[]>
}
let mongo: any
beforeAll(async () => {
  process.env.JWT_KEY = 'test'

  mongo = await MongoMemoryServer.create()
  const mongoUri = await mongo.getUri()
  await mongoose.connect(mongoUri)
})

beforeEach(async () => {
  const collections = await mongoose.connection.db.collections()
  for (const colletion of collections) {
    await colletion.deleteMany({})
  }
})

afterAll(async () => {
  await mongo.stop()
  await mongoose.connection.close()
})

global.signin = async () => {
  const email = 'test@test.com'
  const password = 'password'
  const signupResponse = await request(app)
    .post('/api/users/signup')
    .send({ email, password })
    .expect(201)
  const cookie = signupResponse.get('Set-Cookie')

  return cookie
}
