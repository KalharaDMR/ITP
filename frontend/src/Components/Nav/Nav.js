// src/Components/Nav/Nav.js
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Nav.css";

function Nav({ userRole, setUserRole }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    setUserRole("");
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/">🏨 Kitchen Management</Link>
      </div>

      <ul className="navbar-links">
        {userRole === "staff" && (
          <>
            <li><Link to="/addinventory">Add Inventory</Link></li>
            <li><Link to="/inventory">Inventory</Link></li>
            <li><Link to="/addmenuitem">Add Menu Item</Link></li>
            <li><Link to="/menu">Menu (Admin)</Link></li>
            <li><Link to="/userorders">User Orders</Link></li>
            <li><Link to="/customerbill">Customer Bill</Link></li>
          </>
        )}

        {userRole === "customer" && (
          <>
            <li><Link to="/usermenu">User Menu</Link></li>
            <li><Link to="/customerbill">Customer Bill</Link></li>
          </>
        )}

        {userRole && (
          <li>
            <button className="logout-btn" onClick={handleLogout}>
              Logout
            </button>
          </li>
        )}
      </ul>
    </nav>
  );
}

export default Nav;
