import React, { useState } from 'react';
import {Link, useNavigate} from 'react-router-dom'
import axios from 'axios';

function Login() {
    const [username, setUsername]=useState("")
    const [password, setPassword]=useState("")
    const navigate= useNavigate();

    const handleLogin = async (e) => {
      e.preventDefault();

      try {
          // Send POST request to backend login route
          const response = await axios.post('http://localhost:5000/login', {
              username,
              password
          });

          // If login is successful, redirect to homepage
          if (response.status === 200) {
              console.log('Login successful!');
              navigate('/');  // Redirect to homepage
          }
      } catch (error) {
          if (error.response) {
              // Handle backend errors (like wrong password or user not found)
              alert(error.response.data.message || 'An error occurred');
          } else {
              console.error('Error logging in:', error);
              alert('Something went wrong. Please try again.');
          }
      }
  };




  return (
    <div className='bg-slate-900 w-full h-screen flex items-center justify-center'>
      <div className='bg-slate-800 max-w-md w-full mx-4 shadow-lg rounded-lg px-6 py-8'>
        <h2 className='text-white text-center text-2xl font-semibold mb-6'>Login</h2>
        
        <div className='space-y-4'>
          <input className='w-full p-3 rounded-lg bg-slate-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500'
            type='text' 
            placeholder='Username'
            value={username} 
            onChange={(e) => setUsername(e.target.value)}
            
          />

          <input className='w-full p-3 rounded-lg bg-slate-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500'
            type='password' 
            placeholder='Password' 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button 
          className='w-full mt-6 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 rounded-lg transition duration-300'
          onClick={handleLogin}>
          Login
        </button>
        <p className='text-white text-center mt-4'>
            Need an account? <Link to="/signup" className="text-blue-400 hover:underline">Sign up</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
