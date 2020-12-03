import { CustomError } from './CustomError'

export class NotAuthorizedError extends CustomError {
    httpStatusCode = 401

    constructor(public errorMessage: string) {
        super(errorMessage)
        Object.setPrototypeOf(this, NotAuthorizedError.prototype)
    }

    serializeErrors() {
        console.error(`(${this.httpStatusCode}) [NotAuthorizedError] ${this.message}`)
        return [{ message: this.message }]
    }

}