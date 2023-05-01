import React, { useEffect, useState } from 'react'
import axios from 'axios'
import SidebarNav from '../layout/SidebarNav';
import TaskContainer from '../components/dashboard_components/TaskContainer';

function Tasks({ user }) {

  const [taskList, setTaskList] = useState([]);
  const [refreshKey, setRefreshKey] = useState(0);
  const [addState, setAddState] = useState(false);
  const id = user.id;

  useEffect(() => {
    const getTasks = async () => {
      const accessToken = localStorage.getItem('token');
      await axios.get("http://localhost:5000/tasks", {
        headers: {
          Authorization: 'Bearer ' + accessToken
        },
        params: {
          userId: id
        }
      }).then(result => {
        if (result) {
          setTaskList(result.data);
        } else {
          console.log("No data fetched!");
        }
      }).catch(err => console.log(err));
    };
    getTasks();
  }, [refreshKey, id, addState]);

  const handleAddState = () => {
    setAddState(!addState);
  };



  return (
    <div style={{ display: 'flex' }}>
      <SidebarNav user={user} />
      { addState ? 
      <div className="tasks-content w-100">
        <button onClick={handleAddState}>Cancel</button>
        <button>Add Task</button>
      </div> 
      :
      <div className="tasks-content w-100">
        <div className="header-content d-flex" style={{ margin: '2%' }}>
          <div className="title-container me-2">
            <h2 className='text-light'>Tasks</h2>
          </div>
          <div className="add-task-container ms-3">
            <button className="btn btn-danger" onClick={handleAddState}>Add Task</button>
          </div>
        </div>
        <div className="tasks-container row">
          {
            taskList.map(task => {
              let props = {
                taskHolder: task,
                keyHolder: setRefreshKey
              }
              return <TaskContainer {...props} key={task._id} />
            })
          }
        </div>
      </div>
      }
    </div>
  )
}

export default Tasks