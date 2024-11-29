import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Updatedetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [student, setStudent] = useState({
    roll_no: '',
    name: '',
    age: '',
    class_no: '',
    sec: '',
    contact_no: '',
    attendance: '',
    grade: '',
    password: ''
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStudentDetails = async () => {
      try {
        const response = await axios.get(`/api/students/${id}`);
        console.log(response.data);
        if (response.data.success) {
          setStudent(response.data.student);
        } else {
          setError("Failed to fetch student details.");
        }
      } catch (err) {
        setError("Error fetching student details.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchStudentDetails();
  }, [id]);

 
  const handleChange = (e) => {
    const { name, value } = e.target;
    setStudent((prevStudent) => ({
      ...prevStudent,
      [name]: value,
    }));
  };

 
  const handleSaveChanges = async () => {
    try {
      const response = await axios.put(`/api/student/${id}`, student);
      if (response.data.success) {
        alert("Student details updated successfully!");
        navigate("/"); 
      } else {
        alert("Failed to update student details.");
      }
    } catch (err) {
      console.error("Error updating student details:", err);
      alert("An error occurred while updating.");
    }
  };

  const handleDelete = async () => {
    try {
      const response = await axios.delete(`/api/student/${id}`);
      console.log('Delete response:', response.data);
      alert('Student deleted successfully!');
      navigate("/");
    } catch (error) {
      console.error('Error deleting student:', error.response?.data || error.message);
      alert(`Failed to delete student: ${error.response?.data?.error || error.message}`);
    }
  };
  
  if (loading) return <p className="text-center text-white">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-900 space-y-8">
      <div className="w-full max-w-md p-8 space-y-6 bg-gray-800 rounded-lg shadow-lg">
        <h2 className="py-2 px-4 font-poppins font-medium text-xl text-white bg-gray-500 rounded-md">
          Edit Student Details
        </h2>
        <div className="text-white space-y-4">
          <label className="block">
            <strong>Roll No:</strong>
            <input
              type="text"
              name="roll_no"
              value={student.roll_no}
              onChange={handleChange}
              className="w-full p-2 mt-1 text-black rounded"
            />
          </label>
          <label className="block">
            <strong>Name:</strong>
            <input
              type="text"
              name="name"
              value={student.name}
              onChange={handleChange}
              className="w-full p-2 mt-1 text-black rounded"
            />
          </label>
          <label className="block">
            <strong>Age:</strong>
            <input
              type="number"
              name="age"
              value={student.age}
              onChange={handleChange}
              className="w-full p-2 mt-1 text-black rounded"
            />
          </label>
          <label className="block">
            <strong>Class:</strong>
            <input
              type="text"
              name="class_no"
              value={student.class_no}
              onChange={handleChange}
              className="w-full p-2 mt-1 text-black rounded"
            />
          </label>
          <label className="block">
            <strong>Section:</strong>
            <input
              type="text"
              name="sec"
              value={student.sec}
              onChange={handleChange}
              className="w-full p-2 mt-1 text-black rounded"
            />
          </label>
          <label className="block">
            <strong>Phone Number:</strong>
            <input
              type="text"
              name="contact_no"
              value={student.contact_no}
              onChange={handleChange}
              className="w-full p-2 mt-1 text-black rounded"
            />
          </label>
          <label className="block">
            <strong>Attendance:</strong>
            <input
              type="number"
              name="attendance"
              value={student.attendance}
              onChange={handleChange}
              className="w-full p-2 mt-1 text-black rounded"
            />
          </label>
          <label className="block">
            <strong>Grade:</strong>
            <input
              type="text"
              name="grade"
              value={student.grade}
              onChange={handleChange}
              className="w-full p-2 mt-1 text-black rounded"
            />
          </label>

           
        <label className="block text-white">
          <strong>Password:</strong>
          <input
            type="text"
            name="password"
            value={student.password}
            onChange={handleChange}
            className="w-full p-2 mt-1 text-black rounded"
          />
        </label>
 

        </div>
        <button
          onClick={handleSaveChanges}
          className="mt-6 w-full p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Save Changes
        </button>
        <button
          onClick={handleDelete}
          className="mt-6 w-full p-2 bg-red-500 text-white rounded-md hover:bg-red-600"
        >
          Delete Student
        </button>
      </div>
    </div>
  );
};

export default Updatedetails;
