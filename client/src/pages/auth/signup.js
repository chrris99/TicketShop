import { useState } from 'react'
import axios from 'axios'
import useRequest from '../../hooks/use-request'

const SignUpPage = () => {
    const [ email, setEmail ] = useState('')
    const [ password, setPassword ] = useState('')
    const { doRequest, errors } = useRequest({
        url: '/api/users/signup',
        method: 'post',
        body: {
            email, password
        }
    })
    const onSubmit = async (event) => {
        event.preventDefault()
        doRequest()
    }

    return (
        <form onSubmit={onSubmit}>
            <h1>Sign Up</h1>

            <div className="form-group">
                <label>Email Address</label>
                <input 
                    type="email" 
                    className="form-control" 
                    placeholder="Email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                />
            </div>

            <div className="form-group">
                <label>Password</label>
                <input 
                    type="password" 
                    className="form-control" 
                    placeholder="Password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                />
            </div>

            {errors}
            
            <button type="submit" className="btn btn-primary">Sign Up</button>
        </form>
    )
}

export default SignUpPage