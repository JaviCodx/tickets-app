import { MongoMemoryServer } from 'mongodb-memory-server'
import mongoose from 'mongoose'
import { app } from '../app'
import request from 'supertest'
import jwt from 'jsonwebtoken'

declare global {
  function signin(): string[]
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

global.signin = () => {
  // Build JWT payload {id,email}

  const payload = {
    id: new mongoose.Types.ObjectId().toHexString(),
    email: 'test@test.com'
  }
  // Create the JWT

  const token = jwt.sign(payload, process.env.JWT_KEY!)
  //Build session obj {jwt: MY_JWT}
  const session = { jwt: token }
  //Turn that session into JSON

  const sessionJSON = JSON.stringify(session)
  // Take JSON encode it as base64
  const base64 = Buffer.from(sessionJSON).toString('base64')
  // return string as the cookie

  //array because of supertest  wants cokkies in array
  return [`express:sess=${base64}`]
}
