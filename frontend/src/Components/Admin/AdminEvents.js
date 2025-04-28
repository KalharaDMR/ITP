import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import EventRooms from '../EventDetails/EventRooms';
import './AdminStyles.css';

function AdminEvents() {
  const navigate = useNavigate();

  useEffect(() => {
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
        <h2>Admin Dashboard - Event Bookings</h2>
        <button onClick={handleLogout} className="logout-btn">
          Logout
        </button>
      </div>
      <EventRooms />
    </div>
  );
}

export default AdminEvents;