import nats, { Stan } from 'node-nats-streaming'

class NatsWrapper {
    private _client?: Stan

    get client() {
        if (!this._client) {
            throw new Error('No active connection to NATS Client')
        }

        return this._client
    }

    connect(clusterId: string, clientId: string, url: string) {
        this._client = nats.connect(clusterId, clientId, { url })

        return new Promise<void>((resolve, reject) => {
            this.client.on('connect', () => {
                console.log(`Connection to NATS succesful (${url})`)
                resolve()
            })

            this.client.on('error', (err) => {
                console.error('Connection to NATS unsuccesful')
                reject(err)
            })
        }) 
    }
}

export const natsWrapper = new NatsWrapper()