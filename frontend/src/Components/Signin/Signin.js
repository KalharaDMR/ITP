import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import "./Signin.css"; // Import CSS for styling

function Signin() {
  const history = useNavigate();
  const [user, setUser] = useState({
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
      const response = await axios.post("http://localhost:5000/signin", {
        gmail: user.gmail,
        password: user.password,
      });

      if (response.data.status === "ok") {
        alert("Sign in successful!");
        history("/safaritypes"); // Redirect to Safaris tab
      } else {
        alert(response.data.message || "Sign in failed. Please try again.");
      }
    } catch (err) {
      console.error("Error signing in:", err);
      if (err.response) {
        // Server responded with a status code outside 2xx
        alert(err.response.data.message || "Sign in failed. Please try again.");
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
    <div className="signin-container">
      <div className="signin-form">
        <h1>Sign In</h1>
        <form onSubmit={handleSubmit}>
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
          <button type="submit" className="signin-button">Sign In</button>
        </form>

        <div className="register-link">
          <p>Don't have an account? <Link to="/register">Register here</Link></p>
        </div>
      </div>
    </div>
  );
}

export default Signin;