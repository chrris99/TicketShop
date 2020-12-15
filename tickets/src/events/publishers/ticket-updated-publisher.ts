import { Publisher, EventSubjects, TicketUpdatedEvent } from '@ccticketshop/shared'

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
    subject: EventSubjects.TicketUpdated = EventSubjects.TicketUpdated
}