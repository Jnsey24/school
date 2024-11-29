import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Addteacher = () => {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    address: '',
    phone_number: '',
    subject_id: '',
    experience: '',
    password: '',
  });
  const [subjects, setSubjects] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch subjects to populate the dropdown
    axios.get('/api/subjects')
      .then((response) => setSubjects(response.data))
      .catch((error) => console.error('Error fetching subjects:', error));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/teachers', formData);
      console.log(response.data.message);
      alert('Registration successful');
      navigate('/'); 
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
            Register as Teacher
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
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="Address"
            className="p-3 bg-gray-700 text-white rounded-md outline-none"
            required
          />

          <input
            type="text"
            name="phone_number"
            value={formData.phone_number}
            onChange={handleChange}
            placeholder="Phone Number"
            className="p-3 bg-gray-700 text-white rounded-md outline-none"
            required
          />

          <select
            name="subject_id"
            value={formData.subject_id}
            onChange={handleChange}
            className="p-3 bg-gray-700 text-white rounded-md outline-none"
            required
          >
            <option value="">Select a Subject</option>
            {subjects.map((subject) => (
              <option key={subject.id} value={subject.id}>
                {subject.name}
              </option>
            ))}
          </select>

          <input
            type="text"
            name="experience"
            value={formData.experience}
            onChange={handleChange}
            placeholder="Experience"
            className="p-3 bg-gray-700 text-white rounded-md outline-none"
            required
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

export default Addteacher;
