import React from 'react'
import '../styling/homeFeaturesSection.css'
import taskFeatureImage from '../assets/to_do_list.svg'
import pomoFeatureImage from '../assets/study.svg'

export default function HomeFeaturesSection() {
  return (
    <div className='mt-5 features-container' id='features'>
        <div className="title-container text-center">
            <h2 className='text-light fw-bold title-text'>Let's jump into the <span className='title-phantom'>Phantom</span> features</h2>
        </div>
        <div className="features-list-container w-75 mx-auto mt-4">
            <div className="task-list-feature d-flex">
                <div className="feature-image w-50">
                    <img src={taskFeatureImage} alt="" className='w-100'/>
                </div>
                <div className="feature-text w-50">
                    <h3 className="feature-title fw-semibold">
                        Tired of forgetting every task?
                    </h3>
                    <ul className="task-feature-list-description text-light mt-5">
                        <li className="list-item">You can easily create a to-do list</li>
                        <li className="list-item">Assign a description to it</li>
                        <li className="list-item">See all of your task in a simple interface</li>
                    </ul>
                </div>
            </div>
            <div className="pomodoro-feature d-flex">
                <div className="feature-text w-50">
                      <h3 className="feature-title fw-semibold">
                        Have you ever tried concentrating but no success?
                      </h3>
                      <p className='text-light mt-5'>
                        We have integrated a pomodoro technique in which you can:
                      </p>
                      <ul className='task-feature-list-description text-light'>
                            <li className="list-item">Set a study/break/big break interval</li>
                            <li className="list-item">Assign tasks to sessions</li>
                        </ul>
                </div>
                <div className="feature-image w-50">
                    <img src={pomoFeatureImage} alt="" className='w-100'/>
                </div>
            </div>
        </div>
    </div>
  )
}
