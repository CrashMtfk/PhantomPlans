import React from 'react'
import navLogo from '../assets/navBarLogo.svg';
import '../styling/navbar.css';
import { Link } from 'react-router-dom'


export default function Navbar() {
    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/"><img src={navLogo} alt="" className='ms-4' /></Link>
                <ul className="nav navbar-nav action-buttons">
                    <li className='nav-item mx-4'>
                        <Link href="" className="nav-btn text-center rounded btn" id='log-in-link' to="/login">
                            Log In
                        </Link>
                    </li>
                    <li className="nav-item mx-4">
                        <Link className="btn nav-btn shadow" id='sign-up-button' to="/signup">
                            Sign Up
                        </Link>
                    </li>
                </ul>
            </div>
        </nav>
    )
}
