import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      // Backend logout endpoint call karna
      await axios.post('http://127.0.0.1:8000/api/hos_loginlogout'); // Adjust endpoint according to your backend
      // Local storage se token ko remove karna
      localStorage.removeItem('token');
      // Redirect user to login page
      navigate('/Login');
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  return (
    <button onClick={handleLogout} className=" bg-blue-800 w-44 h-9 rounded-2xl ml-0 mt-24"> 
      Logout
    </button>
  );
};

export default Logout;