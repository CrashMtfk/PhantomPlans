import React, { useState } from 'react'
import axios from 'axios'

function EditTaskContainer({setEditState, task, refresh}) {

    const [modifiedTitle, setModifiedTitle] = useState(task.title);
    const [modifiedDescription, setModifiedDescription] = useState(task.description);
    const [modifiedDeadline, setModifiedDeadline] = useState(task.deadline);

    const changeState = () => {
        setEditState(false);
    }

    const updateTask = (e) => {
        e.preventDefault();
        const accessToken = localStorage.getItem('token');
        axios.put('http://localhost:5000/task/update',{
            taskTitle: modifiedTitle,
            taskDescription: modifiedDescription,
            taskDeadline : modifiedDeadline,
            taskId: task._id
        },{
            headers: {
              Authorization: 'Bearer ' + accessToken
            },
        })
        .then( res => {
            changeState();
            refresh(key => key + 1);
        })
        .catch(err => console.log(err)); 
    };

    return (
        <div className="edit-form-container">
            <form action="" onSubmit={updateTask}>
                <div className="mb-3">
                    <input type="text" onChange={e => setModifiedTitle(e.target.value)} className="form-control" placeholder="Task title" defaultValue={task.title} />
                </div>
                <div className="mb-3">
                    <input type="text" onChange={e => setModifiedDescription(e.target.value)} className="form-control" placeholder="Task description" defaultValue={task.description}/>
                </div>
                <div className="mb-3">
                    <input type="text" onChange={e => setModifiedDeadline(e.target.value)} className="form-control" placeholder="Deadline, if you don't have one leave blank" defaultValue={task.deadline} />
                </div>
                <button type="submit">Apply</button>
            </form>
            <button className='btn btn-outline-danger' onClick={changeState}>Cancel</button>
        </div>
    )
}

export default EditTaskContainer