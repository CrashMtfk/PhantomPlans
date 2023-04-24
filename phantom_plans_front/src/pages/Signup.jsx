import React from 'react'
import Navbar from '../layout/Navbar'
import Footer from '../layout/Footer'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import signupLogo from '../assets/sign_login_logo.svg'
import '../styling/signup.css'
import Axios from 'axios'

export default function SignUp() {

  const [registerName, setRegisterName] = useState("");
  const [registerAge, setRegisterAge] = useState(0);
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerUsername, setRegisterUsername] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [displayMessage, setDisplayMessage] = useState("");
  const [isError, setIsError] = useState(false);

  const navigate = useNavigate();

  const addUser = (event) => {
    event.preventDefault();
    Axios.post('http://localhost:3001/create', {
      name: registerName,
      age: registerAge,
      email: registerEmail,
      username: registerUsername,
      password: registerPassword
    }).then((res) => {
      if (res.data === 'Register success!') setIsError(false);
      else setIsError(true);
      setDisplayMessage(res.data);
      navigate('/login');
    }).catch((err) => {
      console.log(err);
    });
  }

  return (
    <div className='signup-container'>
      <Navbar />
      <div className="content-container w-25 mx-auto d-flex flex-column align-items-center justify-content-center">
        <div className="logo-container mt-5 mb-5">
          <img src={signupLogo} alt="" />
        </div>
        <div className="form-container w-50">
          <form action="" onSubmit={addUser} className='d-flex flex-column'>
            <div className="report-text-container text-center">
              {
                isError ?
                  <p className='text-danger'>{displayMessage}</p>
                  :
                  <p className='text-success'>{displayMessage}</p>

              }
            </div>
            <div className="mb-4">
              <input type="text"
                onChange={(event) => {
                  setRegisterName(event.target.value);
                }}
                className='form-control name-input'
                id="nameInput"
                placeholder='Name' />
            </div>
            <div className="mb-4">
              <input type="number"
                onChange={(event) => {
                  setRegisterAge(event.target.value);
                }}
                className='form-control age-input'
                id="ageInput"
                placeholder='Age' />
            </div>
            <div className="mb-4">
              <input type="text"
                onChange={(event) => {
                  setRegisterEmail(event.target.value);
                }}
                className='form-control email-input'
                id="emailInput"
                placeholder='E-mail' />
            </div>
            <div className="mb-4">
              <input type="text"
                onChange={(event) => {
                  setRegisterUsername(event.target.value);
                }}
                className='form-control username-input'
                id="usernameInput"
                placeholder='Username' />
            </div>
            <div className="mb-4">
              <input type="password"
                onChange={(event) => {
                  setRegisterPassword(event.target.value);
                }}
                className='form-control password-input'
                id="passwordInput"
                placeholder='Password' />
            </div>
            <button type="submit" className='btn wb-3 w-50 mx-auto text-light' id='signup-btn'>Sign Up</button>
          </form>
          <div className="no-account-text mb-5 mt-5">
            <p className='text-center account-text'>Already have an account?<Link to={'/login'} className='nav-link text-light'>Log In</Link></p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}
