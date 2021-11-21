import request from 'supertest'
import { app } from '../../app'

it('201 on successful /api/users/signup', async () => {
  return request(app)
    .post('/api/users/signup')
    .send({ email: 'test@test.com', password: 'password' })
    .expect(201)
})

it('400 on invalid email /api/users/signup', async () => {
  return request(app)
    .post('/api/users/signup')
    .send({ email: 'test.com', password: 'password' })
    .expect(400)
})

it('400 on invalid password /api/users/signup', async () => {
  return request(app)
    .post('/api/users/signup')
    .send({ email: 'test@test.com', password: '12' })
    .expect(400)
})

it('400 on empty email and password /api/users/signup', async () => {
  return request(app).post('/api/users/signup').send({}).expect(400)
})

it('400 on duplicate emails /api/users/signup', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({ email: 'test@test.com', password: 'password' })
    .expect(201)

  return request(app)
    .post('/api/users/signup')
    .send({ email: 'test@test.com', password: 'password' })
    .expect(400)
})

it('sets cookie after successful signup /api/users/signup', async () => {
  const response = await request(app)
    .post('/api/users/signup')
    .send({ email: 'test@test.com', password: 'password' })
    .expect(201)

  expect(response.get('Set-Cookie')).toBeDefined()
})
