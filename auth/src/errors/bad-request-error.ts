import { CustomError } from './custom-error'
export class BadRequestError extends CustomError {
  statusCode = 400
  constructor(public message: string) {
    super(message)

    //Only when extending build in class

    Object.setPrototypeOf(this, BadRequestError.prototype)
  }
  serializeErrors() {
    return [{ message: this.message }]
  }
}
