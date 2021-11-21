import request from 'supertest'
import { app } from '../../app'

it('400 on not registered email /api/users/signin', async () => {
  return request(app)
    .post('/api/users/signin')
    .send({ email: 'test@test.com', password: 'password' })
    .expect(400)
})

it('400 on incorrect password /api/users/signin', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({ email: 'test@test.com', password: 'password' })
    .expect(201)

  return request(app)
    .post('/api/users/signin')
    .send({ email: 'test@test.com', password: 'pass' })
    .expect(400)
})

it('201 on successful /api/users/signin', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({ email: 'test@test.com', password: 'password' })
    .expect(201)

  return request(app)
    .post('/api/users/signin')
    .send({ email: 'test@test.com', password: 'password' })
    .expect(201)
})
