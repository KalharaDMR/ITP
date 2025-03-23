import React from "react";
//import backgroundImage from "../../images/safari1.jpeg"; // Import the image
import "./Home.css"; // Import the CSS file for styling

const Home = () => {
  return (
    <div className="home">
      {/* Navigation Bar */}
      <nav className="navbar">
        <div className="navbar-left">
          <span className="logo">Nature's Lake</span>
          <span className="tagline">HOTEL & MISSION</span>
        </div>
        <div className="navbar-right">
          <a href="/rooms">SAFARI</a>
          <a href="/about">ABOUT ▼</a>
          <a href="/bookings">MY BOOKINGS</a>
          <span className="currency">USD</span>
          <span className="language">ENGLISH - US</span>
          <a href="/signin" className="signin">
            SIGN IN
          </a>
        </div>
      </nav>

      {/* Hero Section */}
      <div
        className="hero"
        //style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        <h1>NATURE'S LAKE VIEW DAMBULLA</h1>
        <p>Near Randeniya Lake, 21100, Dambulla 21100</p>
        <p>94-71-4418716</p>
        <a
          href="https://www.booking.com/searchresults.en-gb.html?aid=311984&label=nature-39-s-lake-view-MthK5P5qLxsvCNL_q_WEHQS469290658478%3Apl%3Ata%3Ap1%3Ap2%3Aac%3Aap%3Aneg%3Afi%3Atikwd-484342154810%3Alp1009919%3Ali%3Adec%3Adm%3Appccp%3DUmFuZG9tSVYkc2RlIyh9YbSsBl3MCvHsD8UKUHIRFxY&gclid=CjwKCAjwnPS-BhBxEiwAZjMF0iNq56WJ5zS5aX1ukx9wvyaLQEt09BV5o3w_4NADn-KvEfAUVEcIOBoCMgwQAvD_BwE&highlighted_hotels=3280132&redirected=1&city=-2215119&hlrd=no_dates&source=hotel&expand_sb=1&keep_landing=1&sid=b18ebd7928e555cb283df8bc885a70a6"
          target="_blank"
          rel="noopener noreferrer"
        >
          Visit Website
        </a>
      </div>

      {/* Location Section */}
      <section className="location">
        <h2>Our Location</h2>
        <p>
          Nestled near the serene Randeniya Lake, Nature's Lake View Dambulla
          offers a tranquil escape with breathtaking views and easy access to
          Dambulla's iconic attractions.
        </p>
        <div className="map">
          <iframe
            title="Nature's Lake View Dambulla"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3951.622578374038!2d80.651215315363!3d7.856305994280047!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3afca5c73f0f3f9f%3A0x4b4b4b4b4b4b4b4b!2sNature%27s%20Lake%20View%20Dambulla!5e0!3m2!1sen!2slk!4v1631234567890!5m2!1sen!2slk"
            width="100%"
            height="400"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
          ></iframe>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-section">
            <h3>Contact Us</h3>
            <p>Near Randeniya Lake, 21100, Dambulla 21100</p>
            <p>Phone: 94- 071-4418716</p>
            <p>Email: info@natureslake.com</p>
          </div>
          <div className="footer-section">
            <h3>Quick Links</h3>
            <ul>
              <li>
                <a href="/rooms">Safari</a>
              </li>
              <li>
                <a href="/about">About</a>
              </li>
              <li>
                <a href="/bookings">My Bookings</a>
              </li>
              <li>
                <a href="/contact">Contact</a>
              </li>
            </ul>
          </div>
          <div className="footer-section">
            <h3>Follow Us</h3>
            <div className="social-links">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                Facebook
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                Instagram
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                Twitter
              </a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2023 Nature's Lake View Dambulla. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
