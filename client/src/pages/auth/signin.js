import { useState } from 'react'
import Router from 'next/router'
import useRequest from '../../hooks/use-request'

const SignInPage = () => {
    const [ email, setEmail ] = useState('')
    const [ password, setPassword ] = useState('')
    const { doRequest, errors } = useRequest({
        url: '/api/users/signin',
        method: 'post',
        body: {
            email, password
        },
        onSuccess: () => Router.push('/')
    })

    const onSubmit = async (event) => {
        event.preventDefault()
        doRequest()
    }

    return (
        <form className="form-signin" onSubmit={onSubmit}>
            <h1 className="mt-3 mb-3 font-weight-normal">Sign In</h1>

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
            
            <button class="btn btn-primary" type="submit">Sign in</button>
        </form>
    )
}

export default SignInPage