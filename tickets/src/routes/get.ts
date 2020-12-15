import express, { Request, Response } from 'express'
import { Ticket } from '../models/ticket'
import { RouteNotFoundError } from '@ccticketshop/shared'

const router = express.Router()

router.get('/api/tickets/:id', async(req: Request, res: Response) => {
    const ticket = await Ticket.findById(req.params.id)

    if (!ticket) {
        throw new RouteNotFoundError('Ticket with given ID not found')
    }

    res.send(ticket)
})

export { router as getTicketRouter }