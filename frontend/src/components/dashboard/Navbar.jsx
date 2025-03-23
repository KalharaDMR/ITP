import React from 'react'
import { useAuth } from '../../context/authContext'

const Navbar = () => {
    const {user, logout} = useAuth();
  return (
    <div className='flex items-center text-white justify-between h-12 bg-teal-600 px-5'>
      <p>Welcome {user.name}</p>
      <button className='px-4 py-1 bg-teal-700 rounded-md hover:bg-red-600' onClick={logout}>Logout</button>
    </div>
  )
}

export default Navbar
