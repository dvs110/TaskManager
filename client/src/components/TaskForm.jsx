import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import '../index.css';

function TaskForm() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [dueDate, setDueDate] = useState('');
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        if (id) {
            axios.get(`http://localhost:8080/api/tasks/${id}`)
                .then(response => {
                    const task = response.data;
                    setTitle(task.title);
                    setDescription(task.description);
                    setDueDate(task.dueDate);
                })
                .catch(error => console.error(error));
        }
    }, [id]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const task = { title, description, dueDate };

        if (id) {
            axios.put(`http://localhost:8080/api/tasks/${id}`, task)
                .then(() => navigate('/'))
                .catch(error => console.error(error));
        } else {
            axios.post('http://localhost:8080/api/tasks', task)
                .then(() => navigate('/'))
                .catch(error => console.error(error));
        }
    };

    return (
        <div className="container">
            <form onSubmit={handleSubmit}>
                <h1>{id ? 'Edit Task' : 'Add Task'}</h1>
                <input
                    type="text"
                    placeholder="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                    className="form-control"
                />
                <textarea
                    placeholder="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                    className="form-control"
                ></textarea>
                <input
                    type="date"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                    required
                    className="form-control"
                />
                <button type="submit" className="btn btn-primary">{id ? 'Update' : 'Add'} Task</button>
            </form>
        </div>
    );
}

export default TaskForm;
