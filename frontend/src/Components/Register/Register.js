import React, { useState } from 'react';
import Nav from '../Nav/Nav';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Register.css'; // Import CSS for styling

function Register() {
  const history = useNavigate();
  const [user, setUser] = useState({
    name: "",
    gmail: "",
    password: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({ ...prevUser, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:5000/register", {
        name: user.name,
        gmail: user.gmail,
        password: user.password,
      });

      if (response.data.status === "ok") {
        alert("Registration successful!");
        history("/roomdetails");
      } else {
        alert(response.data.message || "Registration failed. Please try again.");
      }
    } catch (err) {
      console.error("Error registering user:", err);
      if (err.response) {
        // Server responded with a status code outside 2xx
        alert(err.response.data.message || "Registration failed. Please try again.");
      } else if (err.request) {
        // No response received
        alert("No response from the server. Please check your connection.");
      } else {
        // Something went wrong in setting up the request
        alert("An error occurred. Please try again.");
      }
    }
  };

  return (
    <div className="register-page">
      <Nav />
      <div className="register-container">
        <div className="register-form">
          <h1>Create Account</h1>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Name</label>
              <input
                type="text"
                value={user.name}
                onChange={handleInputChange}
                name="name"
                placeholder="Enter your name"
                required
              />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                value={user.gmail}
                onChange={handleInputChange}
                name="gmail"
                placeholder="Enter your email"
                required
              />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                value={user.password}
                onChange={handleInputChange}
                name="password"
                placeholder="Enter your password"
                required
              />
            </div>
            <button type="submit" className="register-button">Register</button>
          </form>

          <div className="login-link">
            <p>Already have an account? <a href="/login">Sign in</a></p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;