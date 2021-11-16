import express from 'express'

const router = express.Router()

router.post('/apu/users/signout', (req, res) => {
  res.send('Hi there')
})

export { router as signoutRouter }
