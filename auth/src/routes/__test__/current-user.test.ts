import request from 'supertest'
import { app } from '../../app'

it('responds with current user details /api/users/currentuser', async () => {
  const cookie = await signin()

  const response = await request(app)
    .get('/api/users/currentuser')
    .set('Cookie', cookie)
    .send({})
    .expect(200)

  expect(response.body.currentUser.email).toEqual('test@test.com')
})

it('responds with null if not authenticated /api/users/currentuser', async () => {
  const response = await request(app)
    .get('/api/users/currentuser')

    .send({})
    .expect(200)

  expect(response.body.currentUser).toEqual(null)
})
