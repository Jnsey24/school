import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Addstudent = () => {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    class_no: '',
    sec: '',
    address: '',
    contact_no: '',
    attendance: '',
    grade: '',
    password: '',
    roll_no: '',
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/students', formData);
      console.log(response.data.message);
      alert('Registration successful');
      navigate('/'); // Redirect to login page or any other page
    } catch (error) {
      console.error('Error during registration:', error);
      alert('Registration failed');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-grey-900">
      <div className="w-full max-w-md p-8 space-y-6 bg-gray-800 rounded-lg shadow-lg">
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          <h2 className="py-2 px-4 font-poppins font-medium text-xl text-white bg-grey-500 rounded-md">
            Register as Student
          </h2>

          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Name"
            className="p-3 bg-gray-700 text-white rounded-md outline-none"
            required
          />

          <input
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
            placeholder="Age"
            className="p-3 bg-gray-700 text-white rounded-md outline-none"
            required
          />

          <input
            type="text"
            name="class_no"
            value={formData.class_no}
            onChange={handleChange}
            placeholder="Class Number"
            className="p-3 bg-gray-700 text-white rounded-md outline-none"
            required
          />

          <input
            type="text"
            name="sec"
            value={formData.sec}
            onChange={handleChange}
            placeholder="Section"
            className="p-3 bg-gray-700 text-white rounded-md outline-none"
            required
          />

          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="Address"
            className="p-3 bg-gray-700 text-white rounded-md outline-none"
            required
          />

          <input
            type="text"
            name="contact_no"
            value={formData.contact_no}
            onChange={handleChange}
            placeholder="Contact Number"
            className="p-3 bg-gray-700 text-white rounded-md outline-none"
            required
          />

          <input
            type="text"
            name="attendance"
            value={formData.attendance}
            onChange={handleChange}
            placeholder="Attendance"
            className="p-3 bg-gray-700 text-white rounded-md outline-none"
          />

          <input
            type="text"
            name="grade"
            value={formData.grade}
            onChange={handleChange}
            placeholder="Grade"
            className="p-3 bg-gray-700 text-white rounded-md outline-none"
          />

          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            className="p-3 bg-gray-700 text-white rounded-md outline-none"
            required
          />

          <input
            type="text"
            name="roll_no"
            value={formData.roll_no}
            onChange={handleChange}
            placeholder="Roll Number"
            className="p-3 bg-gray-700 text-white rounded-md outline-none"
            required
          />

          <button
            className="py-2 px-4 font-poppins font-medium text-xl text-white bg-blue-500 rounded-md hover:bg-blue-600 transition duration-200"
            type="submit"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Addstudent;
