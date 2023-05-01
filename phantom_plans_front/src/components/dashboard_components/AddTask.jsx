import React from 'react'
import { useNavigate } from 'react-router-dom'

function AddTask({user}) {

    const navigate = useNavigate();

  return (
    <div>
        <button onClick={navigate('/tasks')}>Cancel</button>
        <button>Add Task</button>
    </div>
  )
}

export default AddTask