// src/Components/Admin/AdminLogin.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminLogin.css';

function AdminLogin() {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCredentials(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Update the successful login handler in AdminLogin.js
const handleSubmit = (e) => {
    e.preventDefault();
    
    if (credentials.email === "Nidu8080@gmail.com" && credentials.password === "Niduka@8071") {
      localStorage.setItem('adminAuth', 'true');
      navigate('/admin'); // Redirect to dashboard instead of bookings
    } else {
      setError('Invalid admin credentials');
    }
  };
    
    // Hardcoded admin credentials
    if (credentials.email === "Nidu8080@gmail.com" && credentials.password === "Niduka@8071") {
      // Store admin auth in localStorage
      localStorage.setItem('adminAuth', 'true');
      navigate('/admin');
    } else {
      setError('Invalid admin credentials');
    }
  };

  return (
    <div className="admin-login-container">
      <div className="admin-login-form">
        <h2>Admin Login</h2>
        {error && <div className="error-message">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={credentials.email}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Password:</label>
            <input
              type="password"
              name="password"
              value={credentials.password}
              onChange={handleInputChange}
              required
            />
          </div>
          <button type="submit" className="admin-login-btn">Login</button>
        </form>
      </div>
    </div>
  );
}

export default AdminLogin;