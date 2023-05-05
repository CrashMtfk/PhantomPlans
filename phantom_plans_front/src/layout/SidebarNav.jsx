import React from 'react'
import { ProSidebarProvider, Menu, MenuItem } from 'react-pro-sidebar'
import tasksLogo from '../assets/check-square.svg'
import profileLogo from '../assets/user.svg'
import pomoLogo from '../assets/clock.svg'
import phantomLogo from '../assets/navBarLogo.svg'
import { Link, useNavigate } from 'react-router-dom'
import '../styling/sidebarNav.css'

function SidebarNav({ user }) {

    const navigate = useNavigate();

    const logOutUser = () => {
        navigate('/');
        localStorage.removeItem('token');
        localStorage.removeItem('user');
    };

    return (
        <div className='sidebar-container'>
            <ProSidebarProvider className='d-flex sidebar-component'>
                <div className="phantom-logo-container">
                    <img src={phantomLogo} alt="" />
                </div>
                <div className="nav-links-container-sidebar">
                    <Menu className='nav-items-container-sidebar'>
                        <div className="menu-item-container">
                            <MenuItem className='item-container-sidebar' component={<Link to='/profile' />}><img src={profileLogo} alt="" /></MenuItem>
                        </div>
                        <div className="menu-item-container">
                            <MenuItem className='item-container-sidebar' component={<Link to='/tasks' />}><img src={tasksLogo} alt="" /></MenuItem>
                        </div>
                        <div className="menu-item-container">
                            <MenuItem className='item-container-sidebar' component={<Link to='/pomodoro' />}><img src={pomoLogo} alt="" /></MenuItem>
                        </div>
                    </Menu>
                </div>
                <div className="user-name-container text-center">
                    <p>{user.username}</p>
                    <button to={''} className='btn btn-outline-danger logout-button' onClick={logOutUser}>Log out</button>
                </div>
            </ProSidebarProvider>
        </div>
    )
}

export default SidebarNav