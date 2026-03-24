import React, { useEffect, useState } from 'react'
import { useStatus } from '../../hook/useStatus'
import { useFetch } from '../../hook/useFetch'
import { taskService } from '../../services/taskServices'
import { userService } from '../../services/userService'
import { getToken } from '../../utils/getToken'

export default function AdminDashboard() {
  const { loading, error, success, start, done, fail, succeed } = useStatus();
  const { data: tasks, fetch: fetchTasks } = useFetch(taskService.getAll);
  const { data: users, fetch: fetchUsers } = useFetch(userService.getAll);
  const [form, setForm] = useState({ title: '', description: '' });
  const [selectedUser, setSelectedUser] = useState({});

  useEffect(() => {
    fetchTasks();
    fetchUsers();
  }, [fetchTasks, fetchUsers]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleCreateTask = async (e) => {
    e.preventDefault();
    try {
      start();
      const token = await getToken();
      await taskService.create(token, form);
      setForm({ title: '', description: '' });
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
      const user = users.find(u => u.uid === selectedUser[taskId]);
      if (!user) return alert('Please select a user first!');
      await taskService.assign(token, taskId, {
        userId: user.uid,
        userEmail: user.email
      });
      fetchTasks();
    } catch (err) {
      console.log(err.message);
    }
  }


  return (
    <div>
      <h1>Admin Dashboard</h1>

      {error && <p>{error}</p>}
      {success && <p style={{ color: 'green' }}>Task created!</p>}

      {/* Create Task */}
      <h2>Create Task</h2>
      <form onSubmit={handleCreateTask}>
        <input
          type='text'
          name='title'
          placeholder='Task title'
          value={form.title}
          onChange={handleChange}
        />
        <textarea
          name='description'
          placeholder='Task description'
          value={form.description}
          onChange={handleChange}
        />
        <button type='submit' disabled={loading}>
          {loading ? 'Creating...' : 'Create Task'}
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
            <th>Assign</th>
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
                  value={selectedUser[task.id] || ''}
                  onChange={(e) => setSelectedUser({
                    ...selectedUser,
                    [task.id]: e.target.value
                  })}
                >
                  <option value=''>Select user</option>
                  {users.map(user => (
                    <option key={user.uid} value={user.uid}>
                      {user.email}
                    </option>
                  ))}
                  
                </select>
                <button onClick={() => handleAssign(task.id)}>
                  Assign
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}