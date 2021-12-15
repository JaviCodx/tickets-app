import express, { Request, Response } from 'express'
import { body } from 'express-validator'
import {
  requireAuth,
  validateRequest,
  NotFoundError,
  UnauthorizedError
} from '@jcodx/tickets-common'
import { Ticket } from '../models/ticket'

const router = express.Router()

router.put(
  '/api/tickets/:id',
  requireAuth,
  [
    body('title').not().isEmpty().withMessage('Title is required'),
    body('price').isFloat({ gt: 0 }).withMessage('Price must be greater than 0')
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { title, price } = req.body

    const ticket = await Ticket.findById(req.params.id)
    if (!ticket) {
      throw new NotFoundError()
    }

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    if (ticket.userId !== req.currentUser!.id) {
      throw new UnauthorizedError()
    }

    ticket.set({
      title,
      price
    })
    await ticket.save

    res.status(201).send(ticket)
  }
)
export { router as updateTicketRouter }
