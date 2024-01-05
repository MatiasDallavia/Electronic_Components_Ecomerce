import React from 'react'
import { Link } from 'react-router-dom'

function Register() {
  return (
    <div class="d-flex justify-content-center align-items-center vh-100">
        <div class="container" style={{width: 500, height: 700}}>
        <form>
            <h1 class="h3 mb-3 fw-normal">Please sign in</h1>
    
            <div class="form-floating">
            <input type="email" class="form-control" placeholder="name@example.com"/>
            <label for="floatingInput">Email address</label>
            </div>
            <div class="form-floating">
                <input type="username" class="form-control" placeholder="Username"/>
                <label for="floatingPassword">Username</label>
            </div>
            <div class="form-floating">
            <input type="password" class="form-control" placeholder="Password"/>
            <label for="floatingPassword">Password</label>
            </div>
            <div class="form-floating">
                <input type="password" class="form-control" placeholder="Password"/>
                <label for="floatingPassword">Password</label>
            </div>
    
            <div class="form-check text-start my-3">
            </div>
            <Link to="/login">Already registered?</Link>
            <hr/>
            <button class="btn btn-primary w-100 py-2" type="submit">Sign in</button>
        </form>
        </div>
    </div>
  )
}

export default Register