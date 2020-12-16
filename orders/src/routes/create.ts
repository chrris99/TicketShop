import express, { Request, Response } from 'express'
import { BadRequestError, OrderStatus, requireAuth, RouteNotFoundError, validateRequest } from '@ccticketshop/shared'
import { body } from 'express-validator'

import { Ticket } from '../models/ticket'
import { Order } from '../models/order'

const router = express.Router()

router.post('/api/orders', 
requireAuth, 
[
    body('ticketId').not().isEmpty().withMessage('Ticket ID must be provided')
], 
validateRequest,
async (req: Request, res: Response) => {
    const { ticketId } = req.body
    
    // Find the ticket the user is trying to order in the database
    const ticket = await Ticket.findById(ticketId)

    if (!ticket) {
        throw new RouteNotFoundError('Ticket has not been found in the database')
    }

    // Check if the ticket has not already been reserved
    const existingOrder = await Order.findOne({
        ticket: ticket,
        status: {
            $in: [
                OrderStatus.Created,
                OrderStatus.AwaitPayment,
                OrderStatus.Completed
            ]
        }
    })

    if (existingOrder) {
        throw new BadRequestError('Ticket has been reserved in another order')
    }

    // Calculate an expiration date for this order

    // Build the order and save it to the database

    // Publish an event saying that an order has been created
    res.send({})
})

export { router as createOrderRouter }