import React from 'react'
import navLogo from '../assets/navBarLogo.svg';
import '../styling/navbar.css';
import { Link } from 'react-router-dom'


export default function Navbar() {
    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary shadow">
            <div className="container-fluid">
                <Link className="navbar-brand" href="#" to="/"><img src={navLogo} alt="" className='ms-4' /></Link>
                <div className=" navbar-collapse ms-4 w-75" id="navbarSupportedContent">
                    <ul className="navbar-nav">
                        <li className='nav-item'>
                            <a className='nav-link text-light' href="">
                                Product
                            </a>
                        </li>
                        <li className='nav-item'>
                            <a className='nav-link text-light' href="">
                                About me
                            </a>
                        </li>
                        <li className='nav-item'>
                            <a className='nav-link text-light' href="">
                                Contact
                            </a>
                        </li>
                    </ul>
                </div>
                <ul className="nav navbar-nav action-buttons">
                    <li className='nav-item'>
                        <Link href="" className="nav-link" id='log-in-link' to="/login">Log In</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="btn nav-btn shadow" id='sign-up-button' to="/signup">
                            Sign Up
                        </Link>
                    </li>
                </ul>
            </div>
        </nav>
    )
}
