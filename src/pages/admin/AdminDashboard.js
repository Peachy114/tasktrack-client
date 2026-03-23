import React, { useEffect, useState, useCallback } from 'react'
import { useStatus } from '../../hook/useStatus';

export default function AdminDashboard() {
  const { loading, error, success, start, done, fail, succeed} = useStatus();
  const [users, setUser] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [form, setForm] = useState({ title: "", description:""});
  const [selectUser, setSelectUser] = useState({});
  
  const getToken = async () => {
    const { auth } = await import('../../firebase');
    return await auth.currentUser.getIdToken();
  }

  const fetchTasks = useCallback(async () => {
    try {
      const token = await getToken(); 
      const res = await fetch('http://localhost:5000/tasks', {
        headers: { Authorization: `Bearer ${token}`}
      });
      const data = await res.json();
      setTasks(data);
    } catch (err) {
      console.log(err.message);
    }
  }, []);

  const fetchUsers = useCallback(async () => {
    try {
      const token = await getToken();
      const res = await fetch('http://localhost:5000/users', {
        headers: { Authorization: `Bearer ${token}`}
      });
      const data = await res.json();
      setUser(data);
    } catch (err) {
      console.log(err.message);
    }
  }, []);
  

  useEffect(() => {
    fetchTasks();
    fetchUsers();
  }, [fetchTasks, fetchUsers]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value});
  const handleCreateTask = async (e) => {
    e.preventDefault();
    try {
      start();
      const token = await getToken();
      await fetch('http://localhost:5000/tasks', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(form)
      });
      setForm({ title: "", description: ""});
      succeed();
      fetchTasks();
    } catch (err) {
      fail(err.message);
    } finally {
      done();
    }
  }

  
  const handleAssign = async (taskId) => {
    try {
      const token = await getToken();
      const user = users.find(u => u.uid === selectUser[taskId]);

      await fetch(`http://localhost:5000/tasks/${taskId}/assign`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          userId: user.uid,
          userEmail: user.email
        })
      });
      fetchTasks();
    } catch (err) {
      console.log(err.message);
    }
  }

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <p>Welcome Admin!</p>

      <h2>Create Task</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p style={{ color: "green" }}>Task created!</p>}

      <form onSubmit={handleCreateTask}>
        <input 
          type='text'
          name='title'
          placeholder='Task Title'
          value={form.title}
          onChange={handleChange}
        />
        <textarea 
          name='description'
          placeholder='Task Description'
          value={form.description}
          onChange={handleChange}
        />
        <button type='submit' disabled={loading}>
          {loading ? 'Creating Tasks..' : 'Create Task'}
        </button>
      </form>

      {/* All Users */}
      <h2>All Users</h2>
      <table>
        <thead>
          <tr>
            <th>Email</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.uid}>
              <td>{user.email}</td>
              <td>{user.role}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* All Tasks */}
      <h2>All Tasks</h2>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Status</th>
            <th>Assigned To</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map(task => ( 
            <tr key={task.id}> 
              <td>{task.title}</td>
              <td>{task.description}</td>
              <td>{task.status}</td>
              <td>{task.assignedEmail || 'Unassigned'}</td>
              <td>
                <select
                  value={selectUser[task.id || ""]}
                  onChange={(e) => setSelectUser({
                    ...selectUser, [task.id]: e.target.value
                  })}
                >
                  <option value=""> Select User</option>
                  {users.map(user => (
                    <option key={user.uid} value={user.uid}>{user.email}</option>
                  ))}
                </select>
                <button onClick={() => handleAssign(task.id)}> Assign</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

    </div>
  )
}