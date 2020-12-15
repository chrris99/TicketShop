import { Message } from 'node-nats-streaming'
import { Listener } from './shared/src/messaging/listener'
import { EventSubjects } from './shared/src/messaging/subjects'
import { TicketCreatedEvent } from './shared/src/messaging/events/ticket-created-event'

class TicketCreatedListener extends Listener<TicketCreatedEvent> {
    subject: EventSubjects.TicketCreated = EventSubjects.TicketCreated
    queueGroupName = 'payment-serivce'

    onMessage(data: TicketCreatedEvent['data'], msg: Message) {
        console.log('Event data:', data)

        msg.ack()
    }
}