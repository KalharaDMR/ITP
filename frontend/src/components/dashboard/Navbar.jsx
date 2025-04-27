import React from 'react';
import { useAuth } from '../../context/authContext';

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <div className='flex items-center justify-between h-16 bg-gradient-to-r from-teal-700 to-teal-800 px-6 shadow-lg backdrop-blur-md bg-opacity-90'>
      <p className='text-white text-lg font-medium'>Welcome, {user.name}</p>
      <button
        className='px-4 py-2 bg-gradient-to-r from-teal-800 to-teal-900 text-white rounded-lg hover:from-red-600 hover:to-red-900 transition-all duration-300'
        onClick={logout}
      >
        Logout
      </button>
    </div>
  );
};

export default Navbar;