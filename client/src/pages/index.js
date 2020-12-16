import Link from 'next/link'

const HomePage = ({ currentUser, tickets }) => {

    const ticketList = tickets.map(ticket => {
        return (
            <tr key={ticket.id}>
                <td>{ticket.title}</td>
                <td>{ticket.price}</td>
                <td>
                    <Link 
                        href="/tickets/[ticketId]"
                        as={`/tickets/${ticket.id}`}
                    >
                        <a>More details</a>
                    </Link>
                </td>
            </tr>
        )
    })

    const user = currentUser 
        ? <h3>Hi, you are logged in as {currentUser}</h3> 
        : <h3>You are not logged in</h3>

    return (
        <div>
            <h1>Tickets</h1>
            {user}
            <table className="table">
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Price</th>
                        <th>Details</th>
                    </tr>
                </thead>
                <tbody>
                    {ticketList}
                </tbody>
            </table>
        </div>
    )
}

HomePage.getInitialProps = async (context, client, currentUser) => {
    const { data } = await client.get('/api/tickets')

    return { tickets: data }
}

export default HomePage