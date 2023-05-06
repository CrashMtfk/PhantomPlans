import React, { useEffect, useState } from 'react'
import axios from 'axios'
import SidebarNav from '../layout/SidebarNav';
import TaskContainer from '../components/dashboard_components/TaskContainer';
import '../styling/dashboard_components_style/addTask.css'
import '../styling/dashboard_components_style/tasksView.css'

function Tasks({ user }) {



  const accessToken = localStorage.getItem('token');

  const [taskList, setTaskList] = useState([]);
  const [refreshKey, setRefreshKey] = useState(0);
  const [addState, setAddState] = useState(false);
  const id = user.id;

  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskDescription, setNewTaskDescription] = useState('');
  const [newTaskDeadline, setNewTaskDeadline] = useState('');

  useEffect(() => {
    const getTasks = async () => {
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
  }, [refreshKey, id, addState, accessToken]);

  const addTaskForm = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:5000/task/add", {
      taskTitle: newTaskTitle,
      taskDescription: newTaskDescription,
      taskDeadline: newTaskDeadline,
      userId: id
    }, {
      headers: {
        Authorization: 'Bearer ' + accessToken
      },
    })
      .then(resp => {
        setRefreshKey(refreshKey + 1);
        setAddState(!addState);
      })
      .catch(err => console.log(err));
  };

  const handleToggleState = () => {
    setAddState(!addState);
  }



  return (
    <div style={{ display: 'flex' }}>
      <SidebarNav user={user} />
      {addState ?
        <div className="tasks-content-add w-100">
          <div className="centering-div">
            <form action="" className='add-task-form h-50' onSubmit={addTaskForm}>
              <h2 className='text-center'>Add Task</h2>
              <div className="mb-3 pt-3 input-task-add-container">
                <input type="text" onChange={event => setNewTaskTitle(event.target.value)} className="form-control" placeholder="Task title" />
              </div>
              <div className="mb-3 pt-3 input-task-add-container">
                <textarea type="text" onChange={event => setNewTaskDescription(event.target.value)} rows={5} className="form-control" placeholder="Task description" />
              </div>
              <div className="mb-3 pt-3 input-task-add-container">
                <input type="text" onChange={event => setNewTaskDeadline(event.target.value)} className="form-control" placeholder="Deadline, if you don't have one leave blank" />
              </div>
              <div className="btns-container-task w-75 mx-auto justify-content-center align-items-center d-flex flex-column">
                <button type="submit" className='btn btn-success mb-2'>Add Task</button>
                <button onClick={handleToggleState} className='btn btn-danger'>Cancel</button>
              </div>
            </form>
          </div>
        </div>
        :
        <div className="tasks-content-view w-100 h-100">
          <div className="header-content d-flex justify-content-center" style={{ margin: '2%' }}>
            <div className="title-container me-2">
              <h2 className='text-light'>Tasks</h2>
            </div>
            <div className="add-task-container ms-3">
              <button className="btn btn-danger" onClick={handleToggleState}>Add Task</button>
            </div>
          </div>
          <div className="container tasks-container-grid">
            <div className="row hidden-md-up row-container">
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
        </div>
      }
    </div>
  )
}

export default Tasks