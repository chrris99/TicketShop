import { Request, Response, NextFunction } from 'express'

import { NotAuthorizedError } from '../errors/notAuthorizedError'

// The middleware should be used after the currentUser middleware
export const requireAuth = (req: Request, res: Response, next: NextFunction) => {
    if (!req.currentUser) {
        throw new NotAuthorizedError('User not authorized')
    }

    next()
}