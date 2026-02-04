const API_URL = 'http://localhost:5000/api';


export const login = async (email, password) => {
    try {
        const response = await fetch(`${API_URL}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Login failed');
        }

        return data;
    } catch (error) {
        throw new Error(error.message || 'Network error occurred');
    }
};


export const register = async (name, email, password, role = 'student') => {
    try {
        const response = await fetch(`${API_URL}/auth/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, email, password, role }),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Registration failed');
        }

        return data;
    } catch (error) {
        throw new Error(error.message || 'Network error occurred');
    }
};


export const setAuthToken = (token) => {
    localStorage.setItem('token', token);
};


export const getAuthToken = () => {
    return localStorage.getItem('token');
};


export const removeAuthToken = () => {
    localStorage.removeItem('token');
};


export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
};



export const sendChatMessage = async (messages) => {
    try {
        const token = getAuthToken();
        const response = await fetch(`${API_URL}/chat`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ messages }),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Chat request failed');
        }

        return data;
    } catch (error) {
        throw new Error(error.message || 'Network error occurred');
    }
};


export const getChatHistory = async () => {
    try {
        const token = getAuthToken();
        const response = await fetch(`${API_URL}/chat/history`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Failed to fetch chat history');
        }

        return data;
    } catch (error) {
        throw new Error(error.message || 'Network error occurred');
    }
};

