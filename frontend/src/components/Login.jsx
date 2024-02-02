import React, {useState} from 'react'
import { Link } from 'react-router-dom'
import ErrorMessage from './ErrorMessage';
import {LOGIN_USER} from "../graphql_queries/user_query/LoginMutation"
import { useNavigate } from "react-router-dom";
import  WaitingSpinner  from "./purchased_products/WaitingSpinner"

import {saveTokens} from "../utils/token"
import {fetchData} from "../utils/fetchData"

function Login({setIsLogin}) {

  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false)
  const [errorMesage, setErrorMessage] = useState(false);

  const [mutationVariables, setMutationVariables] = useState({
    username: "",
    password: ""
  });

  


  const handleInputFormChange = (formField, value) => {
    
    setMutationVariables({
      ...mutationVariables,
      [formField]: value
    });
  };  

  const handleLogin = async () => {
    setIsLoading(true)
    try {
      const data = await fetchData(LOGIN_USER, mutationVariables);
      if (data.login === null) {
        setErrorMessage("The credentials were invalid")
      } else {
        saveTokens(data.login)
        setIsLogin(true)
        navigate("/")
      }
    } catch (error) {
      console.error(error); // Handle error
    }
    setIsLoading(false)
  };  

  return (
    
    <div className="d-flex justify-content-center align-items-center vh-100 m-5">
        {isLoading === true && <WaitingSpinner />}
        {!isLoading && (
            <>
            <div className="container m-5" style={{width: 500, height: 700}}>
            {errorMesage.length > 0  && <ErrorMessage error={errorMesage}/>}    

            <form>
                <h1 className="h3 mb-3 fw-normal">Please Log In</h1>
        
                <div className="form-floating">
                <input 
                  type="username" 
                  className="form-control" 
                  id="floatingInput" 
                  placeholder="name@example.com"
                  onChange={(e)=>handleInputFormChange("username", e.target.value)}  
                />
                <label for="floatingInput">Username</label>
                </div>
                <div className="form-floating">
                <input 
                  type="password" 
                  className="form-control" 
                  id="floatingPassword" 
                  placeholder="Password"
                  onChange={(e)=>handleInputFormChange("password", e.target.value)}                
                />
                <label for="floatingPassword">Password</label>
                </div>
        
                <div className="form-check text-start my-3">
                </div>
                <Link to="/register">Not registred yet?</Link>
                <hr/>
                <button 
                  className="btn btn-primary w-100 py-2" 
                  type="button"
                  onClick={handleLogin}
                >
                  Log in
                </button>
            </form>
            </div>
          </>
        )}
    </div>
  )
}

export default Login