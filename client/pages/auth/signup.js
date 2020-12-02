const SignUpPage = () => {
    return (
        <form>
            <h1>Sign Up</h1>
            
            <div class="form-group">
                <label>Email Address</label>
                <input 
                    type="email" 
                    class="form-control" 
                    aria-describedby="emailHelp" 
                    placeholder="Enter email"
                />
                <small class="form-text text-muted">
                    We'll never share your email with anyone else.
                </small>
            </div>

            <div class="form-group">
                <label>Password</label>
                <input 
                    type="password" 
                    class="form-control" 
                    placeholder="Password"
                />
            </div>

            <button type="submit" class="btn btn-primary">Submit</button>
        </form>
    )
}

export default SignUpPage;