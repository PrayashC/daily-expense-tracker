import React, { useState, useEffect } from "react";
import { Routes, Route, BrowserRouter as Router, Navigate } from 'react-router-dom';
import axios from "axios";
import Home from './window/Home';
import Login from "./window/Login";
import Signup from "./window/Signup";
import UpdateUser from "./window/UpdateUser";
import { ToastContainer } from 'react-toastify';

function App() {
  
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verifyAuth = async () => {
      try {
        const token = localStorage.getItem('authToken');
        
        if (!token) {
          setLoading(false);
          return setIsAuthenticated(false);
        }
  
        const response = await axios.get('http://localhost:5000/check-auth', {
          headers: { Authorization: `Bearer ${token}` }
        });
  
        setIsAuthenticated(response.data.success);
      } catch (error) {
        console.error('Auth check failed:', error.message);
        localStorage.removeItem('authToken');
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };
    
    verifyAuth();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <ToastContainer position="top-center" autoClose={3000} />
      <Router>
        <Routes>
          <Route path="/" element={isAuthenticated ? <Home /> : <Navigate to="/login" />} />
          <Route path="/login" element={isAuthenticated ? <Navigate to="/" /> : <Login setIsAuthenticated={setIsAuthenticated} />} />
          <Route path="/signup" element={isAuthenticated ? <Navigate to="/" /> : <Signup />} />
          <Route path="/update" element={isAuthenticated ? <UpdateUser /> : <Navigate to="/login" />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;