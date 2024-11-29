import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Updatedetailstea = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [teacher, setTeacher] = useState({
    teacher_name: '',
    age: '',
    address: '',
    phone_number: '',
    experience: '',
    classes: [],
    password: ''
  });
  const [allClasses, setAllClasses] = useState([]);
  const [classNo, setClassNo] = useState('');
  const [sec, setSec] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
 
  useEffect(() => {
    const fetchTeacherDetails = async () => {
      try {
        const response = await axios.get(`/api/teachers/${id}`);
        if (response.data.success) {
          setTeacher({
            ...response.data.teacher,
            classes: Array.isArray(response.data.class) ? response.data.class : [response.data.class],
          });
        
        } else {
          setError("Failed to fetch teacher details.");
        }
        setLoading(false);
      } catch (err) {
        setError("Error fetching teacher details.");
        console.error(err);
      }
    };

    const fetchAllClasses = async () => {
      try {
        const response = await axios.get(`/api/classes`);
        setAllClasses(Object.values(response.data.classes));
        console.log(response.data.classes);
      } catch (err) {
        console.error("Error fetching all classes", err);
      }
    };

    fetchTeacherDetails();
    fetchAllClasses();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTeacher((prevTeacher) => ({
      ...prevTeacher,
      [name]: value,
    }));
  };

  const handleAddClass = async () => {
   
   
    const selectedClass = allClasses.find(
      (cls) => cls.class_no === Number(classNo.trim()) && cls.sec === sec.trim()

    );
    
    if (selectedClass) {
     
      
      if (!teacher.classes.some((cls) => cls.id === selectedClass.id)) {
       
        setTeacher((prevTeacher) => ({
          ...prevTeacher,
          classes: [...prevTeacher.classes, selectedClass],
        }));
        console.log(teacher.classes);
      } else {
        alert("This class is already assigned to the teacher.");
      }
    } else {
      alert("Class not found. Please check the Class No and Section.");
    }
  };
  

  const handleRemoveClass = (classId) => {
    setTeacher((prevTeacher) => ({
      ...prevTeacher,
      classes: prevTeacher.classes.filter((cls) => cls.id !== classId),
    }));
  };

  const handleSaveChanges = async () => {
    try {
      const response = await axios.put(`/api/teachers/${id}`, {
        name: teacher.teacher_name,
        age: teacher.age,
        address: teacher.address,
        phone_number: teacher.phone_number,
        experience: teacher.experience,
        classes: teacher.classes.map((cls) => cls.id),
        password: teacher.password, 
      });
      if (response.data.success) {
        alert("Teacher details updated successfully!");
        navigate(`/teachers/${id}`);
      } else {
        alert("Failed to update teacher details.");
      }
    } catch (err) {
      console.error("Error updating teacher details:", err);
      alert("An error occurred while updating.");
    }
  };

  const handleDeleteTeacher = async () => {
    try {
      const response = await axios.delete(`/api/teachers/${id}`);
      if (response.data.success) {
        alert("Teacher deleted successfully!");
        navigate('/teachers');
      } else {
        alert("Failed to delete teacher.");
      }
    } catch (err) {
      console.error("Error deleting teacher:", err);
      alert("An error occurred while deleting.");
    }
  };

  if (loading) return <p className="text-center text-white">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-900 p-6">
      <div className="w-full max-w-lg p-8 bg-gray-800 rounded-lg shadow-lg space-y-6">
        <h2 className="text-2xl font-semibold text-white">Edit Teacher Details</h2>

        <label className="block text-white">
          <strong>Name:</strong>
          <input
            type="text"
            name="teacher_name"
            value={teacher.teacher_name}
            onChange={handleInputChange}
            className="w-full p-2 mt-1 text-black rounded"
          />
        </label>
        
        <label className="block text-white">
          <strong>Age:</strong>
          <input
            type="number"
            name="age"
            value={teacher.age}
            onChange={handleInputChange}
            className="w-full p-2 mt-1 text-black rounded"
          />
        </label>

        <label className="block text-white">
          <strong>Address:</strong>
          <input
            type="text"
            name="address"
            value={teacher.address}
            onChange={handleInputChange}
            className="w-full p-2 mt-1 text-black rounded"
          />
        </label>

        <label className="block text-white">
          <strong>Phone Number:</strong>
          <input
            type="text"
            name="phone_number"
            value={teacher.phone_number}
            onChange={handleInputChange}
            className="w-full p-2 mt-1 text-black rounded"
          />
        </label>

        <label className="block text-white">
          <strong>Experience:</strong>
          <input
            type="number"
            name="experience"
            value={teacher.experience}
            onChange={handleInputChange}
            className="w-full p-2 mt-1 text-black rounded"
          />
        </label>

        
        <label className="block text-white">
          <strong>Password:</strong>
          <input
            type="text"
            name="Password"
            value={teacher.password}
            onChange={handleInputChange}
            className="w-full p-2 mt-1 text-black rounded"
          />
        </label>

        <h3 className="text-lg text-white mt-4">Assigned Classes:</h3>
        <ul className="text-white space-y-2">
          {teacher.classes.map((cls) => (
            <li key={cls.id} className="flex justify-between">
              <span>{cls.class_no} - {cls.sec}</span>
              <button
                onClick={() => handleRemoveClass(cls.id)}
                className="text-red-500 hover:underline"
              >
                Remove
              </button>
            </li>
          ))}
        </ul>

        <label className="block text-white mt-4">
          <strong>Class No:</strong>
          <input
            type="text"
            value={classNo}
            onChange={(e) => setClassNo(e.target.value)}
            className="w-full p-2 mt-1 text-black rounded"
          />
        </label>

        <label className="block text-white mt-4">
          <strong>Section:</strong>
          <input
            type="text"
            value={sec}
            onChange={(e) => setSec(e.target.value)}
            className="w-full p-2 mt-1 text-black rounded"
          />
        </label>

        <button
          onClick={handleAddClass}
          className="mt-2 p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Add Class
        </button>

        <button
          onClick={handleSaveChanges}
          className="w-full p-2 mt-4 bg-green-500 text-white rounded hover:bg-green-600"
        >
          Save Changes
        </button>

        <button
          onClick={handleDeleteTeacher}
          className="w-full p-2 mt-4 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Delete Teacher
        </button>
      </div>
    </div>
  );
};

export default Updatedetailstea;
