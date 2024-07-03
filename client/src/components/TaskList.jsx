import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../index.css';  // Import the global CSS file

function TaskList() {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8080/api/tasks')
            .then(response => setTasks(response.data))
            .catch(error => console.error(error));
    }, []);

    return (
        <div className="container">
            <h1>Task List</h1>
            <Link to="/add" className="btn">Add Task</Link>
            <ul>
                {tasks.map(task => (
                    <li key={task._id}>
                        <Link to={`/task/${task._id}`}>{task.title}</Link>
                        <button onClick={() => handleDelete(task._id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );

    function handleDelete(id) {
        axios.delete(`http://localhost:8080/api/tasks/${id}`)
            .then(() => setTasks(tasks.filter(task => task._id !== id)))
            .catch(error => console.error(error));
    }
}

export default TaskList;
