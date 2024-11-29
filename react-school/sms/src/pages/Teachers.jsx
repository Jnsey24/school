import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import styles from "../style";


const Teachers = () => {
  const { id } = useParams();
  const [teacher, setTeacher] = useState(null);
  const [classes, setClasses] = useState([]); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
 
  useEffect(() => {

    const fetchTeacherDetails = async () => {
      try {
        const response = await axios.get(`/api/teachers/${id}`);
        if (response.data.success) {
          setTeacher(response.data.teacher);
          setClasses(response.data.class || []); 
          console.log(response.data);

        }
        else{
          setError("Failed to fetch teacher details.");
        }
        
      } catch (err) {
        setError("Error fetching teacher details.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchTeacherDetails();
  }, [id]);

  if (loading) return <p className="text-center text-white">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-900 space-y-8">
   

      {teacher && (
        <div className="w-full max-w-md p-8 space-y-6 bg-gray-800 rounded-lg shadow-lg">
          <h2 className="py-2 px-4 font-poppins font-medium text-xl text-white bg-gray-500 rounded-md">
            Teacher Details
          </h2>
          <div className="text-white space-y-4">
            <p><strong>Name:</strong> {teacher.teacher_name}</p>
            <p><strong>Age:</strong> {teacher.age}</p>
            <p><strong>Address:</strong> {teacher.address}</p>
            <p><strong>Subject:</strong> {teacher.subject_name}</p>
            <p><strong>Phone Number:</strong> {teacher.phone_number}</p>
            <p><strong>Experience:</strong> {teacher.experience}</p>
          </div>
        </div>
      )}

      <div className="w-full max-w-md p-8 space-y-6 bg-gray-800 rounded-lg shadow-lg">
        <h2 className="py-2 px-4 font-poppins font-medium text-xl text-white bg-gray-500 rounded-md">
          Classes Assigned
        </h2>
        <div className="text-white space-y-4">
          {classes.length > 0 ? (
            classes.map((classItem, index) => (
              <div key={index} className="p-4 bg-gray-700 rounded-md">
                <p><strong>Class No:</strong> {classItem.class_no}</p>
                <p><strong>Section:</strong> {classItem.sec}</p>
               
              </div>
            ))
          ) : (
            <p>No classes assigned.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Teachers;
