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
        ? <h4 className="mb-4">Hi, you are logged in as {currentUser.email}</h4> 
        : <h4 className="mb-4">You are not logged in</h4>

    return (
        <div>
            <h1 className="mt-3 mb-4">Tickets</h1>
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