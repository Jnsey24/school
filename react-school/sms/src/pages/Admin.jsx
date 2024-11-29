import React from 'react';
import { useNavigate } from 'react-router-dom';
import adminIcon from '../adminIcon.png'; 

const Admin = () => {
  const navigate = useNavigate();

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900">
      <div className="relative flex justify-center items-center">
        
        <div className="flex justify-center items-center w-24 h-24 rounded-full bg-gray-700">
          <img src={adminIcon} alt="Admin" className="w-20 h-20" />
        </div>

       
        <div className="absolute top-0 transform -translate-y-full mb-4">
          <button
            onClick={() => navigate('/studentupdate')}
            className="py-2 px-4 font-poppins font-medium text-xl text-white bg-blue-500 rounded-md hover:bg-blue-600 transition duration-200 m-4"
          >
            Update Student details
          </button>
        </div>

        <div className="absolute right-0 transform translate-x-full ml-4">
          <button
            onClick={() => navigate('/addteacher')}
            className="py-2 px-4 font-poppins font-medium text-xl text-white bg-blue-500 rounded-md hover:bg-blue-600 transition duration-200 m-4"
          >
            Add Teacher
          </button>
        </div>

        <div className="absolute bottom-0 transform translate-y-full mt-4">
          <button
            onClick={() => navigate('/teacherupdate')}
            className="py-2 px-4 font-poppins font-medium text-xl text-white bg-blue-500 rounded-md hover:bg-blue-600 transition duration-200 m-4"
          >
            Update Teacher Details
          </button>
        </div>

        <div className="absolute left-0 transform -translate-x-full mr-4">
          <button
            onClick={() => navigate('/addstudent')}
            className="py-2 px-4 font-poppins font-medium text-xl text-white bg-blue-500 rounded-md hover:bg-blue-600 transition duration-200 m-4"
          >
            Add Student
          </button>
        </div>
        
      </div>
    </div>
  );
};

export default Admin;
