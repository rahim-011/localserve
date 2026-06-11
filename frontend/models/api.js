import axios from 'axios';

const API = axios.create({
    baseURL: 'http://localhost:3000/api' || 'https://localserve-m6mo.onrender.com/api' || import.meta.VITE_API_URL
})


API.interceptors.request.use(
    (config) =>{
        const token = localStorage.getItem('token');
        if (token){
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) =>{
        return Promise.reject(error);
    }
)

export default API;