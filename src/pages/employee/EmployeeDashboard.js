import React, { useCallback, useEffect, useState } from 'react'
import { useStatus } from '../../hook/useStatus';

export default function EmployeeDashboard() {
    const { error, fail } = useStatus();
    const [tasks, setTask] = useState([]);

    const getToken = async () => {
        const { auth } = await import("../../firebase");
        return await  auth.currentUser.getIdToken();
    }

    const myTasks = useCallback(async () => {
        try {
            const token =  await getToken();
            const res = await fetch('http://localhost:5000/tasks/my', {
                headers: { Authorization: `Bearer ${token}`}
            });
            const data = await res.json();
            console.log('My tasks data:', data); 
            setTask(Array.isArray(data) ? data : []);

            setTask(data);
        } catch (err) {
            fail(err.message);
        }
    }, []);

    useEffect(() => {
        myTasks();
    }, [myTasks]);

    const handleStatusUpdate = async (taskId, status) => {
        try {
            const token = await getToken();
            await fetch(`http://localhost:5000/tasks/${taskId}/status`, {
                method: 'PUT',
                headers: {
                    Authorization:`Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ status})
            });
            myTasks();
        } catch (err) {
            console.log(err.message);
        }
    }

  return (
    <div>
        <h1>Employee Dashboard</h1>
        {error && <p>{error}</p>}

        <h2>My Tasks</h2>
        {tasks.length === 0 ? 
            <p> No assigned task yet</p> 
            :  
            <table>
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Status</th>
                        <th>Update Status</th>
                    </tr>
                </thead>

                <tbody>
                    {tasks.map(task => (
                        <tr key={task.id}>
                            <td>{task.title}</td>
                            <td>{task.description}</td>
                            <td>{task.status}</td>
                            <td>
                                <select 
                                value={task.status}
                                onChange={(e) => handleStatusUpdate(task.id, e.target.value)}
                                >
                                    <option value="backlog">Backlog</option>
                                    <option value="in_progress">In Progress</option>
                                    <option value="done">Done</option>
                                </select>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>}
    </div>
  )
}
