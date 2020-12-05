import express from 'express'
import 'express-async-errors'
import { json } from 'body-parser'
import cookieSession from 'cookie-session'
import { errorHandler, currentUser, RouteNotFoundError } from '@ccticketshop/shared'

import { createTicketRouter } from './routes/createTicket'
import { getTicketRouter } from './routes/getTicket'
import { getAllTicketsRouter } from './routes/getTickets'
import { updateTicketRouter } from './routes/update'

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
app.use(createTicketRouter)     // POST /api/tickets
app.use(getTicketRouter)        // GET  /api/tickets/:id
app.use(getAllTicketsRouter)    // GET  /api/tickets
app.use(updateTicketRouter)     // PUT  /api/tickets/:id

app.all('*', () => {
    throw new RouteNotFoundError('Route not found')
})

// Middlewares
app.use(errorHandler)

export { app }