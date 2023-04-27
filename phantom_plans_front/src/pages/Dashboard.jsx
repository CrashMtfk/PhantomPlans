import React from 'react'
import Sidebar from '../layout/Sidebar'
import Profile from '../components/dashboard_components/Profile';
import TasksSection from '../components/dashboard_components/TasksSection';
import PomoSection from '../components/dashboard_components/PomoSection';


export default function Dashboard({user}) {

  return (
    <div>
        <Sidebar />
    </div>
  )
}
