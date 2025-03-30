import React, { useState } from 'react';
import axios from 'axios';

const Signup = () => {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [deleteUser, setDeleteUser] = useState("");

  const data = { username, password };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/signup', data, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      console.log('Server response:', response.data);
    } catch (error) {
      console.error('Error submitting form:', error);
    }
    setUsername("");
    setPassword("");
  };

  // const handelDelete = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const response = await axios.post('http://localhost:5000/delete', { username: deleteUser } , {
  //       headers: {
  //         'Content-Type': 'application/json'
  //       }
  //     });
  //     console.log('Server response:', response.data);
  //   } catch (error) {
  //     console.error('Error submitting form:', error);
  //   }
  //   setDeleteUser("");
  // }

  return (
    <div className='bg-slate-900 w-full h-screen flex flex-col items-center justify-center '>
      <div>
        <form className="w-full max-w-sm" onSubmit={handleSubmit}>
          <div className="md:flex md:items-center mb-6">
            <div className="md:w-1/3">
              <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">
                Username
              </label>
            </div>
            <div className="md:w-2/3">
              <input className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" 
                id="inline-full-name" 
                type="text" 
                name="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)} 
                required />
            </div>
          </div>
          <div className="md:flex md:items-center mb-6">
            <div className="md:w-1/3">
              <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">
                Password
              </label>
            </div>
            <div className="md:w-2/3">
              <input className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" 
              id="inline-password" 
              type="password" 
              placeholder="******************" 
              name="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required />
            </div>
          </div>
          <div className="md:flex md:items-center">
            <div className="md:w-1/3"></div>
            <div className="md:w-2/3">
              <button className="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded" 
                type="submit">
                Sign Up
              </button>
            </div>
          </div>
        </form>
      </div>
      {/* <div>
        <h1>To delete user enter username</h1>
      </div>
      <div>
        <form className="w-full max-w-sm" onSubmit={handelDelete}>
          <div className="flex items-center border-b border-teal-500 py-2">
            <input className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
              type="text"
              placeholder="Username"
              aria-label="Full name"
              name="username"
              value={deleteUser}
              onChange={(e) => setDeleteUser(e.target.value)}
              required />
            <button className="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded"
              type="submit">
              Delete
            </button>
          </div>
        </form>
      </div> */}
    </div>
  )
}

export default Signup