import React from 'react'
import heroIllustration from '../assets/calendar_hero_illustration.svg'
import Typed from 'react-typed'
import '../styling/homeHeroSection.css'
import {Link} from 'react-router-dom'

export default function HomeHeroSection() {
  return (
    <div className='mt-5'>
        <div className="hero-left-container">
            <div className="hero-text text-center">
                <h1 className='fw-bold'>THIS IS YOUR NEW</h1>
                <h1><Typed 
                        className ="typing-hero-text fw-bold"
                        strings={[
                            "PLANNER",
                            "TASK LIST",
                            "AGENDA",
                        ]}
                        typeSpeed={75}
                        backSpeed={100}
                        loop
                /></h1>
            </div>
        </div>
        <div className="hero-right-container">
            <img src={heroIllustration} className='img-fluid hero-img mx-auto d-block' alt="" />
        </div>
        <div className="btn-signup-container d-flex justify-content-center">
            <Link className='btn btn-lg text-light' id='start-button' to={'/signup'}>Start</Link>
        </div>
    </div>
  )
}
