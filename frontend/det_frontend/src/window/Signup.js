import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import bgImage from '../assets/bgImage3.jpg';

const Signup = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState({}); 
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage({});
        try {
            const response = await axios.post('http://localhost:5000/signup', { username, password }, {
                headers: { 'Content-Type': 'application/json' }
            });

            const { success, message } = response.data;  

            if (success) {
                alert(message);  
                setUsername(""); 
                setPassword("");
                navigate('/login');  
            } else {
                alert(message);  
            }
        } catch (error) {
            if (error.response && error.response.data.errors) {
                const formattedErrors = {};
                error.response.data.errors.forEach(err => {
                    formattedErrors[err.path] = err.msg;
                });
                setErrorMessage(formattedErrors); 
            } else {
                console.error('Error signing up:', error);
                alert('Something went wrong. Please try again.');
            }
        }
    };

    return (
        <div className="bg-gray-200 w-full h-screen fixed flex items-center justify-center"
            style={{ backgroundImage: `url(${bgImage})`, backgroundSize: "cover", backgroundPosition: "center" }}>
            <div className="bg-black/30 backdrop-blur-[1.25px] w-full h-screen flex items-center justify-center">
                <div className="flex bg-white/90 shadow-lg rounded-lg overflow-hidden w-[800px] h-[500px]">
                    <div className="w-1/2 p-10 bg-gradient-to-r from-zinc-950 to-zinc-700  flex flex-col justify-center h-full gap-4">
                        <h2 className="text-3xl font-semibold text-white text-center">Sign Up</h2>
                        <form className="mt-3">
                            <label className="block text-white">Username</label>
                            <input
                                type="text"
                                className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400"
                                placeholder="Username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                            />

                            {errorMessage.username && (
                                <div className="text-red-500 text-sm mt-1">{errorMessage.username}</div>
                            )}

                            <label className="block text-white mt-4">Password</label>
                            <input
                                type="password"
                                className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />

                            {errorMessage.password && (
                                <div className="text-red-500 text-sm mt-1">{errorMessage.password}</div>
                            )}

                            <button
                                className="w-full mt-8 border text-white border-white py-2 px-6 rounded-lg font-semibold hover:bg-white hover:text-slate-900 transition"
                                onClick={handleSubmit}
                            >
                                Sign Up
                            </button>
                        </form>
                    </div>
                    

                    <div className="w-1/2 flex flex-col items-center justify-center text-white p-8">
                        <h2 className="text-3xl font-semibold text-gray-700">Welcome to DET</h2>
                        <p className="mt-2 text-gray-700">Already have an account?</p>
                        <Link
                            to="/login"
                            className="mt-4 py-2 px-6 border bg-gradient-to-r from-zinc-950 to-zinc-700 text-white rounded-lg font-semibold transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg"
                        >
                            Login
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Signup;
