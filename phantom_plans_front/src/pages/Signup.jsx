import React from 'react'
import Navbar from '../layout/Navbar'
import Footer from '../layout/Footer'
import {Link} from 'react-router-dom'
import { useState } from 'react'
import signupLogo from '../assets/sign_login_logo.svg'
import '../styling/signup.css'
import Axios from 'axios'

export default function SignUp() {

  const [name, setName] = useState("");
  const [age, setAge] = useState(0);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const addUser = () => {
    Axios.post('http://localhost:3001/create', {
      name : name,
      age : age,
      email : email,
      username : username,
      password : password
    }).then(() => {
      console.log("success");
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
          <form action="" className='d-flex flex-column'>
            <div className="mb-4">
              <input type="text"
              onChange={(event) => {
                setName(event.target.value);
              }} 
              className='form-control name-input' 
              id="nameInput"
              placeholder='Name' />
            </div>
            <div className="mb-4">
              <input type="number"
              onChange={(event) => {
                setAge(event.target.value);
              }}
              className='form-control age-input'
              id="ageInput" 
              placeholder='Age' />
            </div>
            <div className="mb-4">
              <input type="text"
              onChange={(event) => {
                setEmail(event.target.value);
              }} 
              className='form-control email-input' 
              id="emailInput" 
              placeholder='E-mail' />
            </div>
            <div className="mb-4">
              <input type="text" 
              onChange={(event) => {
                setUsername(event.target.value);
              }}
              className='form-control username-input' 
              id="usernameInput" 
              placeholder='Username' />
            </div>
            <div className="mb-4">
              <input type="password" 
              onChange={(event) => {
                setPassword(event.target.value);
              }}
              className='form-control password-input' 
              id="passwordInput" 
              placeholder='Password' />
            </div>
            <button type="submit" onClick={addUser} className='btn wb-3 w-50 mx-auto text-light' id='signup-btn'>Sign Up</button>
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
