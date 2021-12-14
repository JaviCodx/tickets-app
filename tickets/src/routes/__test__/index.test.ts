import request from 'supertest'
import { app } from '../../app'

const createTicket = () =>
  request(app)
    .post('/api/tickets')
    .set('Cookie', global.signin())
    .send({ title: 'test', price: 10 })
    .expect(201)

it('200 on list of tickets GET /api/tickets ', async () => {
  await createTicket()
  await createTicket()
  await createTicket()

  const response = await request(app).get(`/api/tickets`).send().expect(200)

  expect(response.body.length).toEqual(3)
})
