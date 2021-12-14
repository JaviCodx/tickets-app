import request from 'supertest'
import { app } from '../../app'
import mongoose from 'mongoose'

it('404 on not found GET /api/tickets ', async () => {
  const id = new mongoose.Types.ObjectId().toHexString()
  await request(app).get(`/api/tickets/${id}`).send().expect(404)
})

it('200 on ticket found GET /api/tickets ', async () => {
  const ticket = { title: 'test', price: 10 }

  const response = await request(app)
    .post('/api/tickets')
    .set('Cookie', global.signin())
    .send(ticket)
    .expect(201)

  const ticketResponse = await request(app)
    .get(`/api/tickets/${response.body.id}`)
    .send()
    .expect(200)

  expect(ticketResponse.body.title).toEqual(ticket.title)
  expect(ticketResponse.body.price).toEqual(ticket.price)
})
it('404 on not found GET /api/tickets ', async () => {
  return
})
it('404 on not found GET /api/tickets ', async () => {
  return
})
