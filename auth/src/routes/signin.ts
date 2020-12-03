import express, { Request, Response } from 'express'
import { body } from 'express-validator'
import jwt from 'jsonwebtoken'
import { validateRequest, BadRequestError } from '@ccticketshop/shared'

import { User } from '../models/user'
import { Password } from '../services/password'

const router = express.Router()

router.post('/api/users/signin', [
    body('email').isEmail().withMessage('Invalid e-mail address'),

    body('password').trim().notEmpty().withMessage('Password is required')
], 

validateRequest,

async (req: Request, res: Response) => {
    const { email, password } = req.body
    
    const existingUser = await User.findOne({ email })
    if (!existingUser) {
        throw new BadRequestError('Invalid credentials')
    }

    const passwordCorrect = await Password.verify(existingUser.password, password)
    if (!passwordCorrect) {
        throw new BadRequestError('Invalid credentials')
    }

    // Generate JWT
    const userJWT = jwt.sign({
        id: existingUser.id,
        email: existingUser.email
    }, process.env.JWT_KEY!)

    // Store JWT on session
    req.session = { jwt: userJWT }

    res.status(200).send(existingUser)
})

export { router as signInRouter }