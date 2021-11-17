import { CustomError } from './custom-error'
import { ValidationError } from 'express-validator'

export class RequestValidationError extends CustomError {
  statusCode = 400
  constructor(private errors: ValidationError[]) {
    super('Invalid request parameters')

    //Only when extending build in class

    Object.setPrototypeOf(this, RequestValidationError.prototype)
  }
  serializeErrors() {
    return this.errors.map((error) => {
      return { message: error.msg, field: error.param }
    })
  }
}
