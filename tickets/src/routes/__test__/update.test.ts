import request from 'supertest'
import { app } from '../../app'
import mongoose from 'mongoose'

it('404 on not found PUT /api/tickets ', async () => {
  const id = new mongoose.Types.ObjectId().toHexString()
  await request(app)
    .put(`/api/tickets/${id}`)
    .set('Cookie', global.signin())
    .send({ title: 'test', price: 10 })
    .expect(404)
})

it('401 on not autheticated  PUT /api/tickets ', async () => {
  const id = new mongoose.Types.ObjectId().toHexString()
  await request(app)
    .put(`/api/tickets/${id}`)
    .send({ title: 'test', price: 10 })
    .expect(401)
})

it('401 on not authorized  PUT /api/tickets ', async () => {
  const response = await request(app)
    .post(`/api/tickets`)
    .set('Cookie', global.signin())
    .send({ title: 'test', price: 10 })
    .expect(201)

  await request(app)
    .put(`/api/tickets/${response.body.id}`)
    .set('Cookie', global.signin())
    .send({ title: 'test', price: 10 })
    .expect(401)
})

it('400 on invalid price or title  PUT /api/tickets ', async () => {
  const cookie = global.signin()

  const response = await request(app)
    .post(`/api/tickets`)
    .set('Cookie', cookie)
    .send({ title: 'test', price: 10 })
    .expect(201)

  await request(app)
    .put(`/api/tickets/${response.body.id}`)
    .set('Cookie', cookie)
    .send({ price: 10 })
    .expect(400)

  await request(app)
    .put(`/api/tickets/${response.body.id}`)
    .set('Cookie', cookie)
    .send({ title: 'test', price: -4 })
    .expect(400)
})

it('201 on successful  PUT /api/tickets ', async () => {
  const cookie = global.signin()

  const response = await request(app)
    .post(`/api/tickets`)
    .set('Cookie', cookie)
    .send({ title: 'test', price: 20 })
    .expect(201)

  const updatedResponse = await request(app)
    .put(`/api/tickets/${response.body.id}`)
    .set('Cookie', cookie)
    .send({ title: 'testUpdated', price: 10 })
    .expect(201)

  expect(updatedResponse.body.title).toEqual('testUpdated')
  expect(updatedResponse.body.price).toEqual(10)
})
