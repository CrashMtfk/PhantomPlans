import React from 'react'
import profileImage from '../assets/profile_picture_wbg.png'
import '../styling/homeAboutSection.css'

export default function HomeAboutSection() {
    return (
        <div className='mt-5 w-100 container-fluid'>
            <div className="content-container w-75 mx-auto">
                <div className="title-container">
                    <h2 className='text-center text-light fw-bold title'>Now, about me...</h2>
                </div>
                <div className="starting-text-container">
                    <h3>I can't wait to <span>design</span> the whole web...</h3>
                </div>
                <div className="main-about-section d-flex mx-auto justify-content-center">
                    <div className="left-atributes-container text-light">
                        <p className='left-first-item'>Web development and design <span>•</span></p>
                        <p className='left-second-item'>Eager to learn new things <span>•</span></p>
                    </div>
                    <div className="profile-image-container">
                        <img src={profileImage} alt="" />
                    </div>
                    <div className="right-atributes-container text-light">
                        <p className='right-first-item'><span>•</span> Third year student</p>
                        <p className='right-second-item'><span>•</span> Sport enthusiast</p>
                    </div>
                </div>
                <div className="ending-text-container text-end mt-5 mb-5">
                    <h3>...but first, <span>coffee</span></h3>
                </div>
            </div>
        </div>
    )
}
