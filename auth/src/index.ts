import mongoose from 'mongoose'
import { app } from './app'

const start = async () => {
  if (!process.env.JWT_KEY) {
    throw new Error('JWT_KEY must be provided in the environment')
  }
  if (!process.env.MONGO_URI) {
    throw new Error('MONGO_URI must be provided in the environment')
  }
  try {
    await mongoose.connect(process.env.MONGO_URI, {})
    console.log('Connected to MongoDB')
  } catch (err) {
    console.log(err)
  }
  app.listen(3000, () => {
    console.log('Listening on port 3000!!')
  })
}

start()
