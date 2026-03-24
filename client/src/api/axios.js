import axios from 'axios';

const API = axios.create({
    baseURL: `${import.meta.env.VITE_API_BASE_URL}/api`,
});

// Add a request interceptor to include the auth token in headers
API.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// Add a response interceptor to handle token expiration/invalid tokens
API.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response && error.response.status === 401) {
            // Token expired or invalid
            localStorage.removeItem('user');
            localStorage.removeItem('token');
            // Navigate to home page
            window.location.href = '/';
        }
        return Promise.reject(error);
    }
);

export default API;
