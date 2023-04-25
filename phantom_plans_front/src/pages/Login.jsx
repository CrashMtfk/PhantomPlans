import React from 'react'
import Navbar from '../layout/Navbar'
import Footer from '../layout/Footer'
import loginLogo from '../assets/sign_login_logo.svg'
import '../styling/login.css'
import {Link} from 'react-router-dom'
import { useState } from 'react'


export default function LogIn() {

  const [loginUsername, setLoginUsername] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  const loginUser = (event) => {
    event.preventDefault();
    console.log('Username ' + loginUsername);
    console.log('Password', loginPassword);
  };

  return (
    <div className='login-container'>
      <Navbar />
      <div className="content-container w-25 mx-auto d-flex flex-column align-items-center justify-content-center">
        <div className="logo-container mt-5 mb-5">
          <img src={loginLogo} alt="" />
        </div>
        <div className="form-container w-50">
          <form action="" onSubmit={loginUser} className='d-flex flex-column'>
            <div className="mb-4">
              <input type="text" name='username' onChange={(event) => setLoginUsername(event.target.value)} className='form-control username-input' id="usernameInput" placeholder='Username' />
            </div>
            <div className="mb-4">
              <input type="password" name='password' onChange={(event) => setLoginPassword(event.target.value)} className='form-control password-input' id="passwordInput" placeholder='Password' />
            </div>
            <button type="submit" className='btn wb-3 w-50 mx-auto text-light' id='login-btn'>Log In</button>
          </form>
          <div className="no-account-text mb-5 mt-5">
            <p className='text-center account-text'>Don't have an account?<Link to={'/signup'} className='nav-link text-light'>Sign Up</Link></p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}
