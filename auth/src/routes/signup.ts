import express, { Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import { body, validationResult } from 'express-validator'
import { RequestValidationError } from '../errors/request-validation-error'
import { User } from '../models/user'
import { BadRequestError } from '../errors/bad-request-error'

const router = express.Router()

router.post(
  '/api/users/signup',
  [
    body('email').isEmail().withMessage('Email must be valid'),
    body('password')
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage('Password must be between 4 and 20 characters')
  ],
  async (req: Request, res: Response) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      throw new RequestValidationError(errors.array())
    }
    const { email, password }: { email: string; password: string } = req.body

    const existingUser = await User.findOne({ email: email })

    if (existingUser) {
      throw new BadRequestError('That email is already in use')
    }
    const newUser = User.build({ email, password })
    await newUser.save()

    //Generate jwt token
    const userJwt = jwt.sign(
      { id: newUser.id, email: newUser.email },
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      process.env.JWT_KEY!
    )

    //Store in cookieSession
    req.session = { jwt: userJwt }

    res.status(201).send(newUser)
  }
)

export { router as signupRouter }
