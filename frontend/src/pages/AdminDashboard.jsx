import React from 'react';
import { useAuth } from '../context/authContext';
import AdminSidebar from '../components/dashboard/AdminSidebar';
import Navbar from '../components/dashboard/Navbar';
import AdminSummary from '../components/dashboard/AdminSummary';
import { Outlet } from 'react-router-dom';

const AdminDashboard = () => {
  const { user } = useAuth();

  return (
    <div className='flex'>
      <AdminSidebar />
      <div
        className='flex-1 ml-64 min-h-screen bg-cover bg-center'
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')" }}
      >
        <div className='bg-black bg-opacity-50 min-h-screen'>
          <Navbar />
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;