const API = import.meta.env.VITE_API_URL;


//this is para sa API calls make the code shorter and reusable.
//The delivery guy — just fetches data=============================================================================
export const taskService = {
    //Get All tasks
    getAll: async (token) => {
        const res = await fetch(`${API}/tasks`, {
            headers: { Authorization: `Bearer ${token}`}
        });

        if (!res.ok) throw new Error('Failed to fetch tasks');
        return res.json();
    },

    //Get specific tasks
    getById: async (token, taskId) => {
        const res = await fetch(`${API}/tasks/${taskId}`, {
            headers: { Authorization: `Bearer ${token}`}
        });
        if (!res.ok) throw new Error('Failed to fetch tasks');
        return res.json();
    },

    // PUT /tasks/:taskId/unassign
    unassign: async (token, taskId) => {
        const res = await fetch(`${API}/tasks/${taskId}/unassign`, {
            method: 'PUT',
            headers: { Authorization: `Bearer ${token}` }
        });
        if (!res.ok) throw new Error('Failed to unassign task.');
        return res.json();
    },

    //POST /tasks
    create: async(token, data) => {
        const res = await fetch(`${API}/tasks`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        if(!res.ok) throw new Error('Failed to create task.');
        return res.json();
    },

    //PUT /tasks/:taskId/assign
    assign: async(token, taskId, data) => {
        const res = await fetch(`${API}/tasks/${taskId}/assign`, {
            method: 'PUT',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        if(!res.ok) throw new Error('Failed to assign task.');
        return res.json();
    },

    //GET /tasks/my
    getMy: async(token) => {
        const res = await fetch(`${API}/tasks/my`, {
            headers: { Authorization: `Bearer ${token}`}
        });
        if (!res.ok) throw new Error('Failed to fetch my tasks.');
        return res.json();
    },

    //PUT /tasks/:taskId/status
    updateStatus: async(token, taskId, status) => {
        const res = await fetch(`${API}/tasks/${taskId}/status`, {
            method: 'PUT',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ status })
        });
        if (!res.ok) throw new Error('Failed to update status.');
        return res.json();
    },

    // GET /tasks/stats/monthly
    getMonthlyStats: async (token) => {
        const res = await fetch(`${API}/tasks/stats/monthly`, {
            headers: { Authorization: `Bearer ${token}` }
        })
        if (!res.ok) throw new Error('Failed to fetch monthly stats')
        return res.json()
    },
    // GET /tasks/stats/summary
    getTaskStats: async (token) => {
        const res = await fetch(`${API}/tasks/stats/summary`, {
            headers: { Authorization: `Bearer ${token}` }
        })
        if (!res.ok) throw new Error('Failed to fetch task stats')
        return res.json()
    },

    edit: async (token, taskId, data) => {
        const res = await fetch(`${API}/tasks/${taskId}/edit`, {
            method: 'PUT',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        if (!res.ok) throw new Error('Failed to edit task')
        return res.json()
    },

}