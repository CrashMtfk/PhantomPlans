import React, { useState } from 'react'
import axios from 'axios'
import SidebarNav from '../layout/SidebarNav';

function Tasks({ user }) {

  const [taskList, setTaskList] = useState([]);

  const displayTasks = async () => {
    const accessToken = localStorage.getItem('token');
    await axios.get("http://localhost:5000/tasks", {
      headers: {
        Authorization: 'Bearer ' + accessToken
      },
      params: {
        userId: user.id
      }
    }).then(result => {
      if (result) {
        console.log('Successfull fetch!');
        console.log(result.data);
        setTaskList(result.data);
      } else {
        console.log("No data fetched!");
      }
    }).catch(err => console.log(err));
  }

  return (
    <div style={{ display: 'flex' }}>
      <SidebarNav user={user} />
      <div className="tasks-content w-100">
        <div className="header-content">
          <div className="title-container">
            <h2>Tasks</h2>
          </div>
        </div>

      </div>

    </div>
  )
}

export default Tasks