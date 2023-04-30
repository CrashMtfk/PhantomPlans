import React from 'react'
import SidebarNav from '../layout/SidebarNav'

function Profile({user}) {
  return (
    <div style={{ display: 'flex', height: '100%', minHeight: '100%vh' }}>
        <SidebarNav user = {user}/>
        <h2>Profile</h2>
    </div>  
  )
}

export default Profile