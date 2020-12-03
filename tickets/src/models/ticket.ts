import mongoose from 'mongoose'

interface ITicket {
    title: string
    price: number
    userId: string
}

interface ITicketDocument extends mongoose.Document {
    title: string
    price: number
    userId: string
}

interface ITicketModel extends mongoose.Model<ITicketDocument> {
    build(ticket: ITicket): ITicketDocument
}

const TicketSchema = new mongoose.Schema({
    title: { type: String, required: true },
    price: { type: Number, required: true },
    userId: { type: String, required: true }
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

const Ticket = mongoose.model<ITicketDocument, ITicketModel>('Ticket', TicketSchema)

export { Ticket }