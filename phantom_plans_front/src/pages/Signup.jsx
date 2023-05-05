import React from 'react'
import Navbar from '../layout/Navbar'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios';
import signupLogo from '../assets/sign_login_logo.svg'
import '../styling/signup.css'

export default function SignUp() {

  const [registerName, setRegisterName] = useState("");
  const [registerAge, setRegisterAge] = useState(0);
  const [registerUsername, setRegisterUsername] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [registerMessage, setRegisterMessage] = useState("");

  const registerUser = (event) => {
    event.preventDefault();
    axios.post('http://localhost:5000/register',{
      name : registerName,
      age : registerAge,
      username : registerUsername,
      password : registerPassword
    }).then((res) => {
      setRegisterMessage(res.data);
    }).catch((err) => {
      console.log(err);
    });
  }

  return (
    <div className='signup-container'>
      <Navbar />
      <div className="content-container-register w-25 mx-auto d-flex flex-column align-items-center justify-content-center">
        <div className="logo-container mt-5 mb-5">
          <img src={signupLogo} alt="" />
        </div>
        <div className="message-container text-center">
          <p>{registerMessage}</p>
        </div>
        <div className="form-container w-75">
          <form action="" onSubmit={registerUser} className='d-flex flex-column'>
            <div className="mb-4">
              {
              // Input for name of the user
              }
              <input type="text"
                onChange={(event) => {
                  setRegisterName(event.target.value);
                }}
                className='form-control name-input'
                id="nameInput"
                placeholder='Name' />
            </div>
            <div className="mb-4">
              {
              // Input for age of the user
              }
              <input type="number"
                onChange={(event) => {
                  setRegisterAge(event.target.value);
                }}
                className='form-control age-input'
                id="ageInput"
                placeholder='Age' />
            </div>
            <div className="mb-4">
              {
              // Input for username of the user
              }
              <input type="text"
                onChange={(event) => {
                  setRegisterUsername(event.target.value);
                }}
                className='form-control username-input'
                id="usernameInput"
                placeholder='Username' />
            </div>
            <div className="mb-4">
              {
              // Input for password of the user
              }
              <input type="password"
                onChange={(event) => {
                  setRegisterPassword(event.target.value);
                }}
                className='form-control password-input'
                id="passwordInput"
                placeholder='Password' />
            </div>
            <button type="submit" className='button-88' id='signup-btn'>Sign Up</button>
          </form>
          <div className="no-account-text mb-5 mt-5">
            <p className='text-center account-text'>Already have an account?<Link to={'/login'} className='nav-link text-light'>Log In</Link></p>
          </div>
        </div>
      </div>
    </div>
  )
}
