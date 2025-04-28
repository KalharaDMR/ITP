// src/Components/Admin/AdminDashboard.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import './AdminDashboard.css';

function AdminDashboard() {
  const navigate = useNavigate();
  const [stats, setStats] = useState({ events: 0, safaris: 0 });
  const [isLoading, setIsLoading] = useState(true);

  // Simulate loading stats
  useEffect(() => {
    const timer = setTimeout(() => {
      setStats({ events: 42, safaris: 28 }); // Replace with actual API call
      setIsLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('adminAuth');
    navigate('/admin/login');
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.6,
        ease: "easeOut"
      }
    },
    hover: {
      scale: 1.03,
      boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
      transition: { 
        duration: 0.3,
        ease: "easeInOut"
      }
    }
  };

  const statVariants = {
    hidden: { opacity: 0 },
    visible: (i) => ({
      opacity: 1,
      transition: {
        delay: i * 0.2,
        duration: 0.8
      }
    })
  };

  return (
    <div className="admin-dashboard">
      <div className="admin-header">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Admin Dashboard
        </motion.h1>
        <motion.button
          onClick={handleLogout}
          className="logout-btn"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Logout
        </motion.button>
      </div>
      
      <div className="stats-container">
        <motion.div 
          className="stat-card"
          custom={0}
          initial="hidden"
          animate="visible"
          variants={statVariants}
        >
          <div className="stat-value">{isLoading ? '--' : stats.events}</div>
          <div className="stat-label">Total Events</div>
        </motion.div>
        
        <motion.div 
          className="stat-card"
          custom={1}
          initial="hidden"
          animate="visible"
          variants={statVariants}
        >
          <div className="stat-value">{isLoading ? '--' : stats.safaris}</div>
          <div className="stat-label">Safari Bookings</div>
        </motion.div>
      </div>

      <AnimatePresence>
        <motion.div 
          className="dashboard-options"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <motion.div
            className="dashboard-card"
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            whileHover="hover"
            onClick={() => navigate('/admin/events')}
          >
            <div className="card-icon events-icon">
              <i className="fas fa-calendar-alt"></i>
            </div>
            <h2>Events Booking Details</h2>
            <p>View and manage all event bookings</p>
            <motion.div 
              className="card-arrow"
              initial={{ x: 0 }}
              whileHover={{ x: 5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <i className="fas fa-arrow-right"></i>
            </motion.div>
          </motion.div>
          
          <motion.div
            className="dashboard-card"
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            whileHover="hover"
            onClick={() => navigate('/admin/bookings')}
          >
            <div className="card-icon safari-icon">
              <i className="fas fa-binoculars"></i>
            </div>
            <h2>Safari Booking Details</h2>
            <p>View and manage all safari bookings</p>
            <motion.div 
              className="card-arrow"
              initial={{ x: 0 }}
              whileHover={{ x: 5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <i className="fas fa-arrow-right"></i>
            </motion.div>
          </motion.div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export default AdminDashboard;