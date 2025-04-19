import React from "react";
import { Link } from "react-router-dom";
import "./Nav.css";

function Nav() {
  return (
    <nav>
      <ul className="nav-ul">
        <li className="nav-li">
          <Link to="/" className="nav-link">
            Home
          </Link>
        </li>
        <li className="nav-li">
          <Link to="/addinventory" className="nav-link">
            Add Inventory
          </Link>
        </li>
        <li className="nav-li">
          <Link to="/inventory" className="nav-link">
            Inventory
          </Link>
        </li>
        {/* Add Menu Management Links */}
        <li className="nav-li">
          <Link to="/addmenuitem" className="nav-link">
            Add Menu Item
          </Link>
        </li>
        <li className="nav-li">
          <Link to="/menu" className="nav-link">
            Menu (Admin)
          </Link>
        </li>
        <li className="nav-li">
          <Link to="/usermenu" className="nav-link">
            User Menu
          </Link>
        </li>
        <li className="nav-li">
          <Link to="/userorders" className="nav-link">
            User Orders
          </Link>
        </li>
        <li className="nav-li">
          <Link to="/customerbill" className="nav-link">
            Customer Bill
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Nav;