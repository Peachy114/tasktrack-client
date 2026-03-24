import React, { useEffect } from 'react'
import { useStatus } from '../../hook/useStatus'
import { useFetch } from '../../hook/useFetch'
import { taskService } from '../../services/taskServices'
import { getToken } from '../../utils/getToken'

export default function EmployeeDashboard() {
  const { error } = useStatus();
  const { data: tasks, fetch: fetchTasks } = useFetch(taskService.getMy);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const handleStatusUpdate = async (taskId, status) => {
    try {
      const token = await getToken();
      await taskService.updateStatus(token, taskId, status);
      fetchTasks();
    } catch (err) {
      console.log(err.message);
    }
  }

  return (
    <div>
      <h1>Employee Dashboard</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <h2>My Tasks</h2>
      {tasks.length === 0
        ? <p>No tasks assigned yet!</p>
        : <table>
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
                      <option value='backlog'>Backlog</option>
                      <option value='in_progress'>In Progress</option>
                      <option value='done'>Done</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
      }
    </div>
  )
}