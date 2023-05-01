import React, { useEffect, useState } from 'react'

function TaskContainer({ task }) {

    const [creationSplitedDate, setCreationSplitedDate] = useState('');
    const [completed, setCompleted] = useState(task.isComplete);

    useEffect(() => {
        splitDate();
    }, []);

    const splitDate = () => {
        let date = task.creationDate;
        let splited = date.split("T");
        setCreationSplitedDate(splited[0]);
    };

    const taskState = () => {
        setCompleted(!completed);
    }

    return (
        <div className={completed ? 'card w-25 h-25 col-sm-6 opacity-50' : 'card w-25 h-25 col-sm-6'} style={{marginLeft: '2%', marginRight: '2%'}}>
            <div className="card-header mt-3 text-center">
                <h5 className="card-title">
                    {task.title}
                </h5>
            </div>
            <div className="card-body">
                <p className="card-text">
                    {task.description}
                </p>
                <p className='card-text'>
                    Due to: {task.deadline}
                </p>
                <div className="buttons-container d-flex justify-content-center">
                    <button className='btn btn-outline-primary w-50 ms-1 me-1  shadow-sm'>Edit</button>
                    {
                        completed ? 
                            <button className='btn btn-outline-secondary w-50 ms-1 me-1  shadow-sm' onClick={taskState}>Uncomplete</button>
                            :
                            <button className='btn btn-outline-success w-50 ms-1 me-1  shadow-sm' onClick={taskState}>Complet</button>
                    }
                    <button className='btn btn-outline-danger w-50  ms-1 me-1  shadow-sm'>Delete</button>
                </div>
            </div>
            <div className="card-footer mb-3">
                <p>
                    Created at: {creationSplitedDate}
                </p>
            </div>
        </div>
    )
}

export default TaskContainer