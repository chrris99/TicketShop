import { CustomError } from './custom-error'

export class RouteNotFoundError extends CustomError {
    httpStatusCode = 404

    constructor() {
        super('Route not found')
        Object.setPrototypeOf(this, RouteNotFoundError.prototype)
    }

    serializeErrors() {
        console.error('[RouteNotFoundError]: Route not found')
        return [{ message: 'Route not found' }]
    }
}