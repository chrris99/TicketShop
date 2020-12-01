import { CustomError } from './custom-error'

export class DatabaseConnectionError extends CustomError {
    httpStatusCode = 500
    reason = 'Error connecting to database'

    constructor() {
        super('Error connecting to database')
        Object.setPrototypeOf(this, DatabaseConnectionError.prototype)
    }

    serializeErrors() {
        console.log('[DatabaseConnectionError]: Error connecting to database')
        return [{ message: 'Error connecting to database' }]
    }
}