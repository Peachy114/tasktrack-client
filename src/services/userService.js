const API = "http://localhost:5000";

export const userService = {

    // POST /users/register
    register: async (token) => {
        const res = await fetch(`${API}/users/register`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        if (!res.ok) throw new Error('Failed to register user');
        return res.json();
    },

    // GET /users/me
    getMe: async (token) => {
        const res = await fetch(`${API}/users/me`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        if (!res.ok) throw new Error('Failed to fetch user.');
        return res.json();
    },

    // GET /users
    getAll: async (token) => {
        const res = await fetch(`${API}/users`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        if (!res.ok) throw new Error('Failed to fetch all users.');
        return res.json();
    }
};