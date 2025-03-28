import React, { useState } from 'react';
import {Link} from 'react-router-dom'

function Login() {
    const [username,setUsername]=useState("")
    const [password,setPassword]=useState("")

    const handleLogin = (e) => {
        e.preventDefault()
    }



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
