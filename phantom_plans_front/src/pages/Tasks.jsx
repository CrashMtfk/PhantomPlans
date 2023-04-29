import React, { useState } from 'react'
import axios from 'axios'

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
        if(result){
          console.log('Successfull fetch!');
          console.log(result.data);
          setTaskList(result.data);
        }else {
          console.log("No data fetched!");
        }
      }).catch(err => console.log(err));
  }

  return (
    <div>
      <h1>Hello + {user.username}</h1>
      <button onClick={displayTasks}>Display Tasks</button>
      {
        taskList.map(task => {
          return <h2 key={task._id}>
            {task.title}
          </h2>
        })
      }
    </div>
  )
}

export default Tasks