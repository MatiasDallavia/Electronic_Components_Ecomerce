import React from 'react'
import { useState } from 'react';
import { Link } from 'react-router-dom'
import ErrorMessage from './ErrorMessage';
import {REGISTER_USER} from "../graphql_queries/user_query/RegisterMutation"
import { useNavigate } from "react-router-dom";

import {fetchData} from "../utils/fetchData"


function Register({setIsLogin}) {

  const [errorMesage, setErrorMessage] = useState(false);

  const navigate = useNavigate();

  const [mutationVariables, setMutationVariables] = useState({
    username: null,
    email: null,
    password: null
  });

  

  const handleInputFormChange = (formField, value) => {
    
    setMutationVariables({
      ...mutationVariables,
      [formField]: value
    });
  };  

  const handleRegister = async () => {
    try {
      const result = await fetchData(REGISTER_USER, mutationVariables);
      if (result.registerUser === null ){
          setErrorMessage("The username is already taken")
      } else{
        setIsLogin(true)
        navigate("/login")
    }      
    } catch (error) {
      console.error(error); // Handle error
    }
  };  

  return (
    <div class="d-flex justify-content-center align-items-center vh-100 mt-5">
        <div class="container mt-5" style={{width: 500, height: 700}}>
        {errorMesage.length > 0  && <ErrorMessage error={errorMesage}/>}    

        <form>
            <h1 class="h3 mb-3 fw-normal">Please Sign In</h1>
    
            <div class="form-floating">
            <input 
              type="email" 
              class="form-control" 
              placeholder="name@example.com" 
              onChange={(e) => handleInputFormChange("email", e.target.value)}/>
            <label for="floatingInput">Email address</label>
            </div>
            <div class="form-floating">
                <input 
                  type="username" 
                  class="form-control" 
                  placeholder="Username"
                  onChange={(e) => handleInputFormChange("username", e.target.value)}                
                />
                <label for="floatingPassword">Username</label>
            </div>
            <div class="form-floating">
            <input 
              type="password" 
              class="form-control" 
              placeholder="Password"
              onChange={(e) => handleInputFormChange("password", e.target.value)}
            />
            <label for="floatingPassword">Password</label>
            </div>

    
            <div class="form-check text-start my-3">
            </div>
            <Link to="/login">Already registered?</Link>
            <hr/>
            <button 
              class="btn btn-primary w-100 py-2" 
              onClick={handleRegister} 
              type="button"
            >
              Sign in
            </button>
        </form>
        </div>
    </div>
  )
}

export default Register