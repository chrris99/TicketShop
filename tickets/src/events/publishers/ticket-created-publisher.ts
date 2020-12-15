import { Publisher, EventSubjects, TicketCreatedEvent } from '@ccticketshop/shared'

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
    subject: EventSubjects.TicketCreated = EventSubjects.TicketCreated
}