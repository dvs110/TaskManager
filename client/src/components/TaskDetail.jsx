import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import '../index.css';  // Import the global CSS file

function TaskDetail() {
    const [task, setTask] = useState(null);
    const { id } = useParams();

    useEffect(() => {
        axios.get(`http://localhost:8080/api/tasks/${id}`)
            .then(response => setTask(response.data))
            .catch(error => console.error(error));
    }, [id]);

    if (!task) return <div>Loading...</div>;

    return (
        <div className="container">
            <h1>{task.title}</h1>
            <p>{task.description}</p>
            <p>Due Date: {new Date(task.dueDate).toLocaleDateString()}</p>
            <Link to={`/edit/${task._id}`} className="btn">Edit</Link>
        </div>
    );
}

export default TaskDetail;
