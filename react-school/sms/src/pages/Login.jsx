import React, { useState } from 'react';
import styles, { layout } from "../style";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {jwtDecode} from 'jwt-decode';
import { useLocation } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/api/login',{
        username,
        password,
        role
      });
      console.log(response.data);
      const {token} =response.data;

      localStorage.setItem('token', token);
      localStorage.setItem('role', role);
      navigate(`/${role}/${jwtDecode(token).id}`);
    } catch (error) {
      console.error('Error during login:', error);
      alert('Login failed');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-grey-900">
      <div className="w-full max-w-md p-8 space-y-6 bg-gray-800 rounded-lg shadow-lg">
        <form onSubmit={handleSubmit} className="flex flex-col  space-y-4">
          <h2 
           className="py-2 px-4 font-poppins font-medium text-xl text-white bg-grey-500 rounded-md "
          >Login</h2>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            className="p-3 bg-gray-700 text-white rounded-md outline-none"
            required
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="p-3 bg-gray-700 text-white rounded-md outline-none"
            required
          />

         <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="p-3 bg-gray-700 text-white rounded-md outline-none"
            required
          >
            <option value="" disabled>User</option>
            <option value="admin">Admin</option>
            <option value="teacher">Teacher</option>
            <option value="student">Student</option>
          </select>

          <button
            className="py-2 px-4 font-poppins font-medium text-xl text-white bg-blue-500 rounded-md hover:bg-blue-600 transition duration-200"
            type="submit"
          >
            Login
          </button>

        </form>
      </div>
    </div>
  );
};

export default Login;
