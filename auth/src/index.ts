import express from 'express'
import 'express-async-errors'
import { json } from 'body-parser'
import mongoose from 'mongoose'
import cookieSession from 'cookie-session'

import { currentUserRouter } from './routes/current-user'
import { signInRouter } from './routes/signin'
import { signOutRouter } from './routes/signout'
import { signUpRouter } from './routes/signup'
import { errorHandler } from './middlewares/error-handler'
import { RouteNotFoundError } from './errors/route-not-found-error'

const app = express()
app.set('trust proxy', true)
app.use(json())
app.use(
    cookieSession({
        signed: false,
        secure: true
    })
)

// Routes
app.use(currentUserRouter)  // GET  /api/users/currentuser
app.use(signInRouter)       // POST /api/users/signin
app.use(signOutRouter)      // POST /api/users/signout
app.use(signUpRouter)       // POST /api/users/signup

app.all('/auth', (req, res) => {
    console.log('Authenticating')
    res.status(200).send('Succesful authentication')
})

app.all('*', () => {
    throw new RouteNotFoundError()
})

// Middlewares
app.use(errorHandler)

const startService = async () => {
    // Check that required environment variable is defined
    if (!process.env.JWT_KEY) {
        throw new Error('JWT_KEY must be defined')
    }

    try {
        await mongoose.connect('mongodb://auth-mongo-srv:27017/auth', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
         })
         console.log('Connected to MongoDB')
    } catch (err) {
        console.error(err);
    }

    app.listen(3000, () => {
        console.log('Listening on port 3000')
    })   
}

startService()