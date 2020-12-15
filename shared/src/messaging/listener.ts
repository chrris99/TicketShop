import { Message, Stan } from 'node-nats-streaming'
import { EventSubjects } from './subjects'

interface Event {
    subject: EventSubjects
    data: any
}

export abstract class Listener<T extends Event> {
    abstract subject: T['subject']
    abstract queueGroupName: string
    abstract onMessage(data: T['data'], msg: Message): void

    private natsClient: Stan
    protected ackWait = 5000

    constructor(natsClient: Stan) {
        this.natsClient = natsClient
    }

    subscriptionOptions() {
        return this.natsClient
            .subscriptionOptions()
            .setDeliverAllAvailable()
            .setManualAckMode(true)
            .setAckWait(this.ackWait)
            .setDurableName(this.queueGroupName)
    }

    listen() {
        const subscription = this.natsClient.subscribe(
            this.subject,
            this.queueGroupName,
            this.subscriptionOptions()
        )

        subscription.on('message', (msg: Message) => {
            console.log(`Message received: ${this.subject} / ${this.queueGroupName}`)
            
            const parsedData = this.parseMessage(msg)
            this.onMessage(parsedData, msg)
        })
    }

    parseMessage(msg: Message) {
        const data = msg.getData()
        return typeof data === 'string'
            ? JSON.parse(data)
            : JSON.parse(data.toString('utf8'))
    }
}