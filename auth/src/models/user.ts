import mongoose from 'mongoose'
import { Password } from '../services/password'

//interface for creating a new User
interface UserAttrs {
  email: string
  password: string
}

//interface for User Model
interface UserModel extends mongoose.Model<UserDoc> {
  build(attrs: UserAttrs): UserDoc
}

//interface for User Document

interface UserDoc extends mongoose.Document {
  email: string
  password: string
}

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    }
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id
        delete ret._id
        delete ret.password
        delete ret.__v
      }
    }
  }
)

userSchema.pre('save', async function (done) {
  if (this.isModified('password')) {
    const hashed = await Password.toHash(this.get('password'))
    this.set('password', hashed)
    done()
  }
})

userSchema.statics.build = (user: UserAttrs) => {
  return new User(user)
}
const User = mongoose.model<UserDoc, UserModel>('User', userSchema)

export { User }
