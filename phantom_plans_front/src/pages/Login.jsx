import React from 'react'
import Navbar from '../layout/Navbar'
import loginLogo from '../assets/sign_login_logo.svg'
import '../styling/login.css'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';


export default function LogIn({setUser}) {

  const [loginUsername, setLoginUsername] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const navigate = useNavigate();

  const logInUser = async (e) => {
    e.preventDefault();
      const req = await axios.post('http://localhost:5000/login', {
        username: loginUsername,
        password: loginPassword
      });
      const user = req.data;
      setUser(user);
      localStorage.setItem('user', JSON.stringify(user));
      const token = req.data.accessToken;
      localStorage.setItem('token', token);
      navigate('/tasks');
  };
  

  return (
    <div className='login-container d-flex flex-column'>
      <Navbar />
      <div className="content-container w-25 mx-auto d-flex flex-column align-items-center justify-content-center">
        <div className="logo-container mt-5 mb-5">
          <img src={loginLogo} alt="" />
        </div>
        <div className="form-container w-50">
          <form action="" onSubmit={logInUser} className='d-flex flex-column'>
            <div className="mb-4">
              <input type="text" name='username' onChange={(event) => setLoginUsername(event.target.value)} className='form-control username-input' id="usernameInput" placeholder='Username' />
            </div>
            <div className="mb-4">
              <input type="password" name='password' onChange={(event) => setLoginPassword(event.target.value)} className='form-control password-input' id="passwordInput" placeholder='Password' />
            </div>
            <button type="submit" className='button-87' id='login-btn'>Log In</button>
          </form>
          <div className="no-account-text mb-5 mt-5">
            <p className='text-center account-text'>Don't have an account?<Link to={'/signup'} className='nav-link text-light'>Sign Up</Link></p>
          </div>
        </div>
      </div>
    </div>
  )
}
