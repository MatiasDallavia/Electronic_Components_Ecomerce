import React, {useState} from 'react'
import { Link } from 'react-router-dom'
import { useMutation } from '@apollo/client';
import {LOGIN_USER} from "../graphql_queries/user_query/LoginMutation"

import {saveTokens} from "../utils/token"

function Login() {

  const [mutationVariables, setMutationVariables] = useState({
    username: null,
    password: null
  });

  const [loginMutation, { loading, error, data }] = useMutation(LOGIN_USER, {variables : mutationVariables});
  


  const handleInputFormChange = (formField, value) => {
    
    setMutationVariables({
      ...mutationVariables,
      [formField]: value
    });
    console.log(mutationVariables)
  };  

  const handleLogin = async () => {
    console.log("first")
    try {
      const result = await loginMutation({
        variables: mutationVariables
      });
      console.log(result.data); // Handle success
      saveTokens(result.data.login)
    } catch (error) {
      console.error(error); // Handle error
    }
  };  

  return (
    <div class="d-flex justify-content-center align-items-center vh-100 m-5">
        <div class="container m-5" style={{width: 500, height: 700}}>
        <form>
            <h1 class="h3 mb-3 fw-normal">Please Log In</h1>
    
            <div class="form-floating">
            <input 
              type="username" 
              class="form-control" 
              id="floatingInput" 
              placeholder="name@example.com"
              onChange={(e)=>handleInputFormChange("username", e.target.value)}  
            />
            <label for="floatingInput">Username</label>
            </div>
            <div class="form-floating">
            <input 
              type="password" 
              class="form-control" 
              id="floatingPassword" 
              placeholder="Password"
              onChange={(e)=>handleInputFormChange("password", e.target.value)}                
            />
            <label for="floatingPassword">Password</label>
            </div>
    
            <div class="form-check text-start my-3">
            </div>
            <Link to="/register">Not registred yet?</Link>
            <hr/>
            <button 
              class="btn btn-primary w-100 py-2" 
              type="button"
              onClick={handleLogin}
            >
              Log in
            </button>
        </form>
        </div>
    </div>
  )
}

export default Login