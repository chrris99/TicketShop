import { CustomError } from './customError'

export class RouteNotFoundError extends CustomError {
    httpStatusCode = 404

    constructor(public errorMessage: string) {
        super(errorMessage)
        Object.setPrototypeOf(this, RouteNotFoundError.prototype)
    }

    serializeErrors() {
        console.error(`(${this.httpStatusCode}) [RouteNotFoundError] ${this.message}`)
        return [{ message: this.message }]
    }
}