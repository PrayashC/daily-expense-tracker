import React, { useState } from 'react';
import {Link, useNavigate} from 'react-router-dom'
import axios from 'axios';
import bgImage from '../assets/bgImage3.jpg'

function Login() {
    const [username, setUsername]=useState("")
    const [password, setPassword]=useState("")
    const navigate= useNavigate();

    const handleLogin = async (e) => {
      e.preventDefault();

      try {
          
          const response = await axios.post('http://localhost:5000/login', {
              username,
              password
          });

          const { success, message } = response.data; 

            if (success) {
                console.log( message); 
                navigate('/'); 
            } else {
                alert(message);
            }
      } catch (error) {
          if (error.response) {
              
              alert(error.response.data.message || 'An error occurred');
          } else {
              console.error('Error logging in:', error);
              alert('Something went wrong. Please try again.');
          }
      }
  };




  return (
    <div className='bg-gray-200 w-full h-screen fixed items-center justify-center '
    style={{ backgroundImage: `url(${bgImage})`, backgroundSize: "cover", backgroundPosition: "center" }}>
      <div className='bg-black/30 backdrop-blur-[1.25px] w-full h-screen flex items-center justify-center'>
        <div className='flex bg-white/90 shadow-lg rounded-lg overflow-hidden w-[800px] h-[500px]'>
        <div className="w-1/2 p-10 flex flex-col justify-center h-full gap-4">
            <h2 className="text-3xl font-semibold text-gray-700 text-center">Login</h2>
            <form className="mt-3">
              <label className="block text-gray-700">Username</label>
              <input
                type="text"
                className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400"
                placeholder="Username"
                value={username} 
                onChange={(e) => setUsername(e.target.value)}
              />
              <label className="block text-gray-700 mt-4">Password</label>
              <input
                type="password"
                className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button className="w-full mt-8 bg-gradient-to-r from-zinc-950 to-zinc-700 text-white py-2 rounded-lg font-semibold transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg"
              onClick={handleLogin}>
                Login
              </button>
            </form>
          </div>

          <div className="w-1/2 bg-gradient-to-r from-zinc-950 to-zinc-700 flex flex-col justify-center items-center text-white p-8">
            <h2 className="text-3xl font-semibold">Welcome to DET</h2>
            <p className="mt-2">Don't have an account?</p>
            <Link to="/signup" className="mt-4 border border-white py-2 px-6 rounded-lg font-semibold hover:bg-white hover:text-slate-900 transition">
              Sign Up
            </Link>
          </div>



        </div>
      </div>
    </div>
  );
}

export default Login;
