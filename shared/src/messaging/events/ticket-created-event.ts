import { EventSubjects } from '../subjects'

export interface TicketCreatedEvent {
    subject: EventSubjects.TicketCreated
    data: {
        id:     string
        title:  string
        price:  number
        userId: string
    }
}