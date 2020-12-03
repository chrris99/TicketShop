import express from 'express'
import 'express-async-errors'
import { json } from 'body-parser'
import cookieSession from 'cookie-session'
import { errorHandler, currentUser, RouteNotFoundError } from '@ccticketshop/shared'

import { createTicketRouter } from './routes/createTicket'

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
app.use(currentUser)

// Routes
app.use(createTicketRouter)

app.all('*', () => {
    throw new RouteNotFoundError('Route not found')
})

// Middlewares
app.use(errorHandler)

export { app }