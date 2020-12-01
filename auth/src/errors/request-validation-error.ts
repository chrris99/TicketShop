import { ValidationError } from 'express-validator'
import { CustomError } from './custom-error'

export class RequestValidationError extends CustomError {
    httpStatusCode = 400

    constructor(public errors: ValidationError[]) {
        super('Invalid request parameters')
        Object.setPrototypeOf(this, RequestValidationError.prototype)
    }

    serializeErrors() {
        return this.errors.map(err => {
            console.log(`[RequestValidationError]: ${err.msg}`)
            return { message: err.msg, field: err.param }
        })
    }
}