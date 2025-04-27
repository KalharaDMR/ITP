import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaBuilding, FaCalendarAlt, FaCogs, FaMoneyBillWave, FaTachometerAlt, FaUsers } from 'react-icons/fa';

const AdminSidebar = () => {
  return (
    <div className='bg-gray-900 bg-opacity-80 backdrop-blur-md text-white h-screen fixed left-0 top-0 bottom-0 w-64 shadow-2xl'>
      <div className='bg-gradient-to-r from-teal-600 to-teal-700 h-16 flex items-center justify-center shadow-lg'>
        <h3 className='text-xl font-semibold'>Staff Management System</h3>
      </div>
      <div className='px-4 py-6 space-y-2'>
        <NavLink
          to="/admin-dashboard"
          className={({ isActive }) =>
            `${isActive ? "bg-gradient-to-r from-teal-600 to-teal-700 text-white shadow-lg" : "text-gray-300 hover:bg-gradient-to-r from-teal-600 to-teal-700 hover:text-white hover:shadow-lg"} flex items-center space-x-4 py-3 px-4 rounded-lg transition-all duration-300`
          }
          end
        >
          <FaTachometerAlt className='text-xl' />
          <span>Dashboard</span>
        </NavLink>
        <NavLink
          to="/admin-dashboard/employees"
          className={({ isActive }) =>
            `${isActive ? "bg-gradient-to-r from-teal-600 to-teal-700 text-white shadow-lg" : "text-gray-300 hover:bg-gradient-to-r from-teal-600 to-teal-700 hover:text-white hover:shadow-lg"} flex items-center space-x-4 py-3 px-4 rounded-lg transition-all duration-300`
          }
        >
          <FaUsers className='text-xl' />
          <span>Staff Members</span>
        </NavLink>
        <NavLink
          to="/admin-dashboard/departments"
          className={({ isActive }) =>
            `${isActive ? "bg-gradient-to-r from-teal-600 to-teal-700 text-white shadow-lg" : "text-gray-300 hover:bg-gradient-to-r from-teal-600 to-teal-700 hover:text-white hover:shadow-lg"} flex items-center space-x-4 py-3 px-4 rounded-lg transition-all duration-300`
          }
        >
          <FaBuilding className='text-xl' />
          <span>Departments</span>
        </NavLink>
        <NavLink
          to="/admin-dashboard/leaves"
          className={({ isActive }) =>
            `${isActive ? "bg-gradient-to-r from-teal-600 to-teal-700 text-white shadow-lg" : "text-gray-300 hover:bg-gradient-to-r from-teal-600 to-teal-700 hover:text-white hover:shadow-lg"} flex items-center space-x-4 py-3 px-4 rounded-lg transition-all duration-300`
          }
        >
          <FaCalendarAlt className='text-xl' />
          <span>Leave</span>
        </NavLink>
        <NavLink
          to="/admin-dashboard/salary/add"
          className={({ isActive }) =>
            `${isActive ? "bg-gradient-to-r from-teal-600 to-teal-700 text-white shadow-lg" : "text-gray-300 hover:bg-gradient-to-r from-teal-600 to-teal-700 hover:text-white hover:shadow-lg"} flex items-center space-x-4 py-3 px-4 rounded-lg transition-all duration-300`
          }
        >
          <FaMoneyBillWave className='text-xl' />
          <span>Salary</span>
        </NavLink>
        <NavLink
          to="/admin-dashboard/setting"
          className={({ isActive }) =>
            `${isActive ? "bg-gradient-to-r from-teal-600 to-teal-700 text-white shadow-lg" : "text-gray-300 hover:bg-gradient-to-r from-teal-600 to-teal-700 hover:text-white hover:shadow-lg"} flex items-center space-x-4 py-3 px-4 rounded-lg transition-all duration-300`
          }
        >
          <FaCogs className='text-xl' />
          <span>Settings</span>
        </NavLink>
      </div>
    </div>
  );
};

export default AdminSidebar;