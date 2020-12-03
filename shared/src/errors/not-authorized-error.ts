import { CustomError } from './custom-error'

export class NotAuthorizedError extends CustomError {
    httpStatusCode = 401

    constructor() {
        super('Not authorized')
        Object.setPrototypeOf(this, NotAuthorizedError.prototype)
    }

    serializeErrors() {
        console.error('[NotAuthorizedError]: Not authorized')
        return [{ message: 'Not authorized' }]
    }

}