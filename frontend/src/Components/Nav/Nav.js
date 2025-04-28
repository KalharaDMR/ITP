import React from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { FaUserCircle, FaSignOutAlt } from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';
import './nav.css';

function Nav() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/signin');
  };

  // Hide navbar on login/register/admin routes
  const hideNavRoutes = ['/signin', '/register', '/admin/login', '/safari-signin', '/safari-register', '/events-signin'];
  if (hideNavRoutes.includes(location.pathname)) {
    return null;
  }

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <span className="logo" onClick={() => navigate('/')}>Nature's Lake</span>
      </div>

      <div className="navbar-right">
        <NavLink
          to="/safari-home"
          className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
        >
          Safaris
        </NavLink>
        <NavLink
          to="/events-home"
          className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
        >
          Events
        </NavLink>
        <NavLink
          to="/addroom"
          className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
        >
          Book Safari
        </NavLink>

        {user ? (
          <>
            <NavLink
              to={user.role === 'admin' ? '/admin/safari-bookings' : '/roomdetails'}
              className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
            >
              My Bookings
            </NavLink>
            <div className="user-menu">
              <FaUserCircle className="profile-icon" />
              <span className="user-name">{user.name}</span>
              <button onClick={handleLogout} className="logout-btn" title="Logout">
                <FaSignOutAlt />
              </button>
            </div>
          </>
        ) : (
          <NavLink
            to="/signin"
            className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
          >
            Sign In
          </NavLink>
        )}
      </div>
    </nav>
  );
}

export default Nav;
