import express from 'express'
import 'express-async-errors'
import { json } from 'body-parser'
import cookieSession from 'cookie-session'
import { errorHandler, RouteNotFoundError } from '@ccticketshop/shared'

import { currentUserRouter } from './routes/current-user'
import { signInRouter } from './routes/signin'
import { signOutRouter } from './routes/signout'
import { signUpRouter } from './routes/signup'

// App
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

app.all('*', () => {
    throw new RouteNotFoundError('Route not found')
})

// Middlewares
app.use(errorHandler)

export { app }