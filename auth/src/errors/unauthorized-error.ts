import { CustomError } from './custom-error'
export class UnauthorizedError extends CustomError {
  statusCode = 401
  constructor() {
    super('Not authorized')

    //Only when extending build in class

    Object.setPrototypeOf(this, UnauthorizedError.prototype)
  }
  serializeErrors() {
    return [{ message: 'Not authorized' }]
  }
}
