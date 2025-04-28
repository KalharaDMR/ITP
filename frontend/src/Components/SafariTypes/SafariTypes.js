import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FaUserAlt, FaCalendarAlt, FaChild, FaMoneyBillWave, FaLock } from 'react-icons/fa';
import './SafariTypes.css';

function SafariTypes() {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Static data for safaris with local image paths
  const safaris = [
    {
      id: 1,
      name: "Block 1 (Palatupana)",
      location: "Palatupana, Sri Lanka",
      details: "Booked in last 2 hours",
      pricePerPerson: 3500,
      bookingsLast24Hours: 3,
      imageUrl: "/images/safari12.jpeg",
    },
    {
      id: 2,
      name: "Block 1 (Katagamuwa)",
      location: "Yala, Sri Lanka",
      pricePerPerson: 2500,
      bookingsLast24Hours: 4,
      imageUrl: "/images/safari15.jpeg",
    },
    {
      id: 3,
      name: "Blocks 4&5 (Galge)",
      location: "Yala, Sri Lanka",
      details: "Booked in last 4 hours",
      pricePerPerson: 2800,
      bookingsLast24Hours: 1,
      imageUrl: "/images/safari8.jpeg",
    },
    {
      id: 4,
      name: "Yala National Park",
      location: "Yala, Sri Lanka",
      pricePerPerson: 3500,
      bookingsLast24Hours: 5,
      imageUrl: "/images/safari14.jpeg",
    },
    {
      id: 5,
      name: "Udawalawe National Park",
      location: "Udawalawe, Sri Lanka",
      details: "Booked in last 8 hours",
      pricePerPerson: 3800,
      bookingsLast24Hours: 2,
      imageUrl: "/images/safari2.jpeg",
    },
    {
      id: 6,
      name: "Wilpattu National Park",
      location: "Wilpattu, Sri Lanka",
      details: "Booked in last 10 hours",
      pricePerPerson: 4500,
      bookingsLast24Hours: 3,
      imageUrl: "/images/safari7.jpeg",
    },
    {
      id: 7,
      name: "Minneriya National Park",
      location: "Minneriya, Sri Lanka",
      pricePerPerson: 4800,
      bookingsLast24Hours: 4,
      imageUrl: "/images/safari9.jpeg",
    },
    {
      id: 8,
      name: "Horton Plains National Park",
      location: "Nuwara Eliya, Sri Lanka",
      details: "Booked in last 14 hours",
      pricePerPerson: 3200,
      bookingsLast24Hours: 2,
      imageUrl: "/images/safari4.jpeg",
    },
    {
      id: 9,
      name: "Kumana National Park",
      location: "Kumana, Sri Lanka",
      pricePerPerson: 5000,
      bookingsLast24Hours: 1,
      imageUrl: "images/safari3.jpeg",
    },
  ];

  const handleViewRates = (safari) => {
    navigate('/addroom', { state: { safari } });
  };

  return (
    <div className="safari-types-page">
      {/* Enhanced Navigation Bar */}
      <nav className={`main-navbar ${isMenuOpen ? 'open' : ''}`}>
        <div className="logo">🌍 Nature's Lake View Hotel</div>
        
        <div className="hamburger" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          <div className="line"></div>
          <div className="line"></div>
          <div className="line"></div>
        </div>
        
        <ul className={`nav-links ${isMenuOpen ? 'open' : ''}`}>
          <li><Link to="/" onClick={() => setIsMenuOpen(false)}>Home</Link></li>
          <li><Link to="/safaritypes" onClick={() => setIsMenuOpen(false)}>Safari</Link></li>
          <li><Link to="/eventtypes" onClick={() => setIsMenuOpen(false)}>Events</Link></li>
          <li><Link to="/about" onClick={() => setIsMenuOpen(false)}>About</Link></li>
          <li><Link to="/roomdetails" onClick={() => setIsMenuOpen(false)}>My Bookings</Link></li>
          <li><a href="#contact" onClick={() => setIsMenuOpen(false)}>Contact</a></li>
          <li>
            <Link to="/safari-home" className="signin-btn" onClick={() => setIsMenuOpen(false)}>
              Sign Out
            </Link>
          </li>
        </ul>
      </nav>

      {/* Safari Types Content */}
      <div className="safari-types-container">
        <div className="hero-section">
          <div className="hero-content">
            <h1 className="hero-title">Wildlife Safari Adventures</h1>
            <p className="hero-subtitle">Experience the untamed beauty of Sri Lanka's national parks</p>
          </div>
        </div>

        <div className="content-wrapper">
          <div className="page-header">
            <h1>SELECT A SAFARI</h1>
            <div className="sort-by">
              <span>Sort By: Relevance</span>
            </div>
          </div>
          
          <div className="safari-grid">
            {safaris.map((safari) => (
              <div key={safari.id} className="safari-card" onClick={() => handleViewRates(safari)}>
                <div className="card-image-container">
                  <img
                    src={safari.imageUrl}
                    alt={safari.name}
                    className="safari-image"
                  />
                  <div className="card-overlay"></div>
                  <div className="card-badge">
                    <span>{safari.bookingsLast24Hours} booked today</span>
                  </div>
                </div>
                <div className="card-content">
                  <h2>{safari.name}</h2>
                  <p className="location">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 2C8.13 2 5 5.13 5 9C5 14.25 12 22 12 22C12 22 19 14.25 19 9C19 5.13 15.87 2 12 2ZM12 11.5C10.62 11.5 9.5 10.38 9.5 9C9.5 7.62 10.62 6.5 12 6.5C13.38 6.5 14.5 7.62 14.5 9C14.5 10.38 13.38 11.5 12 11.5Z" fill="currentColor"/>
                    </svg>
                    {safari.location}
                  </p>
                  {safari.details && <p className="details">{safari.details}</p>}
                  <div className="price-section">
                    <span className="price-label">From</span>
                    <span className="price">LKR {safari.pricePerPerson.toLocaleString()}</span>
                    <span className="price-unit">Per Person</span>
                  </div>
                  <p className="taxes">Excluding taxes and fees</p>
                  <button
                    className="view-rates"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleViewRates(safari);
                    }}
                  >
                    View rates
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SafariTypes;