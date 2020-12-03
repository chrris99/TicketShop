import { CustomError } from './customError'

export class BadRequestError extends CustomError {
    httpStatusCode = 400

    constructor(public errorMessage: string) {
        super(errorMessage)
        Object.setPrototypeOf(this, BadRequestError.prototype)
    }

    serializeErrors() {
        console.error(`(${this.httpStatusCode}) [BadRequestError] ${this.message}`)
        return [{ message: this.message }]
    }  
}