import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Rooms from '../RoomDetails/Rooms';
import './AdminStyles.css';

function AdminBookings() {
  const navigate = useNavigate();

  useEffect(() => {
    // Check if admin is authenticated
    if (!localStorage.getItem('adminAuth')) {
      navigate('/admin/login');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('adminAuth');
    navigate('/admin/login');
  };

  return (
    <div className="admin-container">
      <div className="admin-header">
        <button 
          onClick={() => navigate('/admin')} 
          className="back-btn"
        >
          ← Back to Dashboard
        </button>
        <h2>Admin Dashboard - Safari Bookings</h2>
        <button onClick={handleLogout} className="logout-btn">
          Logout
        </button>
      </div>
      <Rooms />
    </div>
  );
}

export default AdminBookings;