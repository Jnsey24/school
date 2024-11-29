import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import styles from "../style";



const Students = () => {
  const { id } = useParams();
  const [student, setStudent] = useState(null);
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
 
  useEffect(() => {
    const fetchStudentDetails = async () => {
      try {
        const response = await axios.get(`/api/students/${id}`);
        if (response.data.success) {
          setStudent(response.data.student);
          setTeachers(response.data.teacher || []);
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

  if (loading) return <p className="text-center text-white">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-900 space-y-8">
  
      {student && (
        <div className="w-full max-w-md p-8 space-y-6 bg-gray-800 rounded-lg shadow-lg">
          <h2 className="py-2 px-4 font-poppins font-medium text-xl text-white bg-gray-500 rounded-md">
            Student Details
          </h2>
          <div className="text-white space-y-4">
            <p><strong>Roll No:</strong> {student.id}</p>
            <p><strong>Name:</strong> {student.name}</p>
            <p><strong>Age:</strong> {student.age}</p>
            <p><strong>Class:</strong> {student.class_no}</p>
            <p><strong>Section:</strong> {student.sec}</p>
            <p><strong>Phone Number:</strong> {student.contact_no}</p>
            <p><strong>Attendance:</strong> {student.attendance}</p>
            <p><strong>Grade:</strong> {student.grade}</p>
          </div>
        </div>
      )}

      
      <div className="w-full max-w-md p-8 space-y-6 bg-gray-800 rounded-lg shadow-lg">
        <h2 className="py-2 px-4 font-poppins font-medium text-xl text-white bg-gray-500 rounded-md">
          Teachers and Subjects
        </h2>
        <div className="text-white space-y-4">
          {teachers && teachers.length > 0 ? (
            teachers.map((teacher, index) => (
              <div key={index} className="p-4 bg-gray-700 rounded-md">
                <p><strong>Teacher:</strong> {teacher.teacher_name}</p>
                <p><strong>Subject:</strong> {teacher.subject_name}</p>
              </div>
            ))
          ) : (
            <p>No teachers assigned to this class.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Students;
