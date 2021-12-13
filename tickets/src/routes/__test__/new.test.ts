import request from 'supertest'
import { app } from '../../app'
import { Ticket } from '../../models/ticket'

it('route handler POST /api/tickets', async () => {
  const response = await request(app).post('/api/tickets').send({})

  expect(response.status).not.toEqual(404)
})

it('can only be accessed if the user is signed in', async () => {
  const response = await request(app).post('/api/tickets').send({})

  expect(response.status).toEqual(401)
})

it('NOT 401 if the user is signed in', async () => {
  const response = await request(app)
    .post('/api/tickets')
    .set('Cookie', global.signin())
    .send({})

  expect(response.status).not.toEqual(401)
})

it('400 on invalid title POST /api/tickets', async () => {
  await request(app)
    .post('/api/tickets')
    .set('Cookie', global.signin())
    .send({ title: '', price: 10 })
    .expect(400)

  await request(app)
    .post('/api/tickets')
    .set('Cookie', global.signin())
    .send({ price: 10 })
    .expect(400)
})
it('400 on invalid price POST /api/tickets', async () => {
  await request(app)
    .post('/api/tickets')
    .set('Cookie', global.signin())
    .send({ title: 'test', price: -10 })
    .expect(400)

  await request(app)
    .post('/api/tickets')
    .set('Cookie', global.signin())
    .send({ title: 'test' })
    .expect(400)
})

it('201 on successful POST /api/tickets', async () => {
  const tickets = await Ticket.find({})
  expect(tickets.length).toEqual(0)

  const ticket = { title: 'test', price: 10 }

  await request(app)
    .post('/api/tickets')
    .set('Cookie', global.signin())
    .send(ticket)
    .expect(201)

  const ticketsAfter = await Ticket.find({})
  expect(ticketsAfter.length).toEqual(1)
  expect(ticketsAfter[0].title).toEqual(ticket.title)
  expect(ticketsAfter[0].price).toEqual(ticket.price)
})
