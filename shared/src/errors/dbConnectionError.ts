import { CustomError } from './CustomError'

export class DbConnectionError extends CustomError {
    httpStatusCode = 500

    constructor(public errorMessage: string) {
        super(errorMessage)
        Object.setPrototypeOf(this, DbConnectionError.prototype)
    }

    serializeErrors() {
        console.error(`(${this.httpStatusCode})[DbConnectionError] ${this.message}`)
        return [{ message: this.message }]
    }
}