import React from 'react'
import Sidebar from '../components/EmployeeDashboard/Sidebar'
import {Outlet} from 'react-router-dom'
import Navbar from '../components/dashboard/Navbar'
import SummaryCard from '../components/EmployeeDashboard/Summary'

const EmployeeDashboard = () => {
  return (
    <div className='flex'>
      <Sidebar />
      <div className='flex-1 ml-64 h-screen relative'>
        {/* Background image */}
        <div
          className='absolute inset-0 bg-cover bg-center -z-10'
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')" }}
        ></div>
        {/* Overlay for dark effect */}
        <div className='absolute inset-0 bg-black bg-opacity-40 -z-10'></div>
        <Navbar />
        <div className='p-5'>
        </div>
        <Outlet />
      </div>
    </div>
  )
}

export default EmployeeDashboard
