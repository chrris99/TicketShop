import mongoose from 'mongoose'

interface ITicket {
    title: string
    price: number
}

interface ITicketDocument extends mongoose.Document {
    title: string
    price: number
}

interface ITicketModel extends mongoose.Model<ITicketDocument> {
    build(ticket: ITicket): ITicketDocument
}

const TicketSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },

    price: {
        type: Number,
        required: true,
        min: 0
    }
})

TicketSchema.set('toJSON', {
    transform(doc: any, ret: { _id: any, id: any }) {
        ret.id = ret._id
        delete ret._id
    }
})

TicketSchema.static('build', (ticket: ITicket) => {
    return new Ticket(ticket)
})

TicketSchema.method()

const Ticket = mongoose.model<ITicketDocument, ITicketModel>('Ticket', TicketSchema)

export { Ticket, ITicketDocument }