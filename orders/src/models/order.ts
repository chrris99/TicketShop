import mongoose, { mongo } from 'mongoose'
import { OrderStatus } from '@ccticketshop/shared'
import { ITicketDocument } from './ticket'

interface IOrder {
    userId: string
    status: OrderStatus
    expiresAt: Date
    ticket: ITicketDocument
}

interface IOrderDocument extends mongoose.Document {
    userId: string
    status: OrderStatus
    expiresAt: Date
    ticket: ITicketDocument
}

interface IOrderModel extends mongoose.Model<IOrderDocument> {
    build(order: IOrder) : IOrderDocument
}

const OrderSchema = new mongoose.Schema({
    userId: { 
        type: String, 
        required: true 
    },

    status: { 
        type: String, 
        required: true, 
        num: Object.values(OrderStatus) ,
        default: OrderStatus.Created
    },

    expiresAt: { 
        type: String 
    },

    ticket: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Ticket' 
    }
})

OrderSchema.set('toJSON', {
    transform(doc: any, ret: { _id: any, id: any }) {
        ret.id = ret._id
        delete ret._id
    }
})

OrderSchema.static('build', (order: IOrder) => {
    return new Order(order)
})

const Order = mongoose.model<IOrderDocument, IOrderModel>('Order', OrderSchema)

export { Order }