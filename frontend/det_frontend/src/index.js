import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import axios from 'axios';
import './index.css';


const token = localStorage.getItem('authToken');
if (token) {
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}


axios.interceptors.response.use(
  response => response,
  error => {
    
    if (error.config.url.includes('/check-auth')) {
      return Promise.reject(error);
    }
    
    if (error.response?.status === 401) {
      localStorage.removeItem('authToken');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);