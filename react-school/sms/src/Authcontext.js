
import React, { createContext, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';


const AuthContext = createContext();


export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [authToken, setAuthToken] = useState(localStorage.getItem('token') || ''); // To track auth token
  const [userRole, setUserRole] = useState(localStorage.getItem('role') || ''); // To track user role

 
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    setAuthToken('');
    setUserRole('');
    navigate('/');
  };

  return (
    <AuthContext.Provider value={{authToken, userRole, handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
};


export const useAuth = () => useContext(AuthContext);
