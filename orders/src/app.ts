import express from 'express'
import 'express-async-errors'
import { json } from 'body-parser'
import cookieSession from 'cookie-session'
import { errorHandler, currentUser, RouteNotFoundError } from '@ccticketshop/shared'

import { createOrderRouter } from './routes/create'
import { getOrderRouter } from './routes/get'
import { listOrdersRouter } from './routes/list'
import { deleteOrderRouter } from './routes/delete'

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
app.use(createOrderRouter)     // POST     /api/orders
app.use(getOrderRouter)        // GET      /api/orders/:id
app.use(listOrdersRouter)      // GET      /api/orders
app.use(deleteOrderRouter)     // DELETE   /api/orders/:id

app.all('*', () => {
    throw new RouteNotFoundError('Route not found')
})

// Middlewares
app.use(errorHandler)

export { app }