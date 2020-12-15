export enum OrderStatus {
    // When the order has been created, but the ticket it is trying
    // to order has not yet been reserved
    Created = 'created',

    // The ticket tthe order is trying to reserve has already been
    // reserved, or when the user has canceled the order or the order
    // expires before payment
    Canceled = 'canceled',

    // The order has successfully reserved the ticket
    AwaitPayment = 'await:payment',

    // The order has reserved the ticket and the user has provied
    // payment successfully
    Completed = 'completed'
}