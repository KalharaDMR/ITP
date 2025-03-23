import React from "react";
import { NavLink } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa"; // Profile icon
import "./nav.css";

function Nav({ isSignedIn }) {
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <span className="logo">Nature's Lake</span>
      </div>
      <div className="navbar-right">
        <NavLink to="/mainhome" className="nav-link" activeClassName="active">
          Home
        </NavLink>
        <NavLink to="/safaritypes" className="nav-link" activeClassName="active">
          Safaris
        </NavLink>
        <NavLink to="/addroom" className="nav-link" activeClassName="active">
          Book Now
        </NavLink>
        <NavLink to="/roomdetails" className="nav-link" activeClassName="active">
          My Bookings
        </NavLink>
        <NavLink to="/contact" className="nav-link" activeClassName="active">
          Contact
        </NavLink>
        <NavLink to="/profile" className="nav-link">
          <FaUserCircle className="profile-icon" />
        </NavLink>
      </div>
    </nav>
  );
}

export default Nav;