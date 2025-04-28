import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { animateScroll as scroll } from "react-scroll";
import { 
  FaArrowUp, FaUtensils, FaBed, FaWifi, FaSwimmingPool, 
  FaMapMarkerAlt, FaPhone, FaEnvelope, FaFacebook, 
  FaTwitter, FaInstagram, FaLinkedin, FaStar
} from "react-icons/fa";
import { FiMenu, FiX } from "react-icons/fi";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import './EventsHome.css';

// Fix leaflet marker icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png')
});

function EventsHome() {
  const navigate = useNavigate();
  const [showScroll, setShowScroll] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "Wedding Planner",
      content: "Nature's Lake provided the perfect backdrop for our client's wedding. The team was professional and the venue was breathtaking.",
      rating: 5
    },
    {
      id: 2,
      name: "Michael Chen",
      role: "Corporate Event Organizer",
      content: "We hosted our annual conference here and everything was flawless. The AV setup was perfect and the catering was exceptional.",
      rating: 5
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      role: "Birthday Celebration",
      content: "Celebrated my 30th here with 50 friends. The staff went above and beyond to make it special. The lakeside views were unforgettable!",
      rating: 4
    }
  ];

  const galleryImages = [
    { id: 1, src: '/images/gallery1.jpg', alt: 'Wedding by the lake' },
    { id: 2, src: '/images/gallery2.jpg', alt: 'Corporate event setup' },
    { id: 3, src: '/images/gallery3.jpg', alt: 'Birthday celebration' },
    { id: 4, src: '/images/gallery4.jpg', alt: 'Conference room' },
    { id: 5, src: '/images/gallery5.jpg', alt: 'Outdoor ceremony' },
    { id: 6, src: '/images/gallery6.jpg', alt: 'Cocktail reception' }
  ];

  const handleSignIn = () => {
    setUser({
      name: "Guest User",
      email: "guest@example.com"
    });
  };

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      setEmail('');
      setTimeout(() => setIsSubscribed(false), 3000);
    }
  };

  const scrollToTop = () => {
    scroll.scrollToTop();
  };

  const nextTestimonial = () => {
    setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setActiveTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextTestimonial();
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const checkScroll = () => {
      if (!showScroll && window.pageYOffset > 400) {
        setShowScroll(true);
      } else if (showScroll && window.pageYOffset <= 400) {
        setShowScroll(false);
      }
    };

    window.addEventListener('scroll', checkScroll);
    return () => window.removeEventListener('scroll', checkScroll);
  }, [showScroll]);

  return (
    <div className="events-home-container">
      {/* Combined Navigation Bar */}
      <nav className={`main-navbar ${isMenuOpen ? 'open' : ''}`}>
        <div className="nav-logo">
          <span className="logo-icon">🌍</span>
          <span className="logo-text">Nature's Lake Events</span>
        </div>
        
        <div className="hamburger" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </div>
        
        <ul className={`nav-links ${isMenuOpen ? 'open' : ''}`}>
          <li><Link to="/" onClick={() => setIsMenuOpen(false)}>Home</Link></li>
          <li><Link to="/eventbooking" onClick={() => setIsMenuOpen(false)}>Book Event</Link></li>
          <li><Link to="/events-signin" onClick={() => setIsMenuOpen(false)}>Events Sign In</Link></li>
          <li><Link to="/rooms" onClick={() => setIsMenuOpen(false)}>Accommodation</Link></li>
          <li><Link to="/safaritypes" onClick={() => setIsMenuOpen(false)}>Safari Tours</Link></li>
          <li><Link to="/gallery" onClick={() => setIsMenuOpen(false)}>Gallery</Link></li>
          <li><Link to="/contact" onClick={() => setIsMenuOpen(false)}>Contact</Link></li>
          {!user ? (
            <li>
              <button className="signin-btn" onClick={handleSignIn}>
                Sign In
              </button>
            </li>
          ) : (
            <li className="user-greeting">Welcome, {user.name}</li>
          )}
        </ul>
      </nav>

      {/* Events Hero Section */}
      <div className="events-hero">
        <h1>Create Unforgettable Moments</h1>
        <p className="hero-subtitle">Premium event spaces with stunning lake views</p>
        <button 
          className="cta-btn"
          onClick={() => navigate('/eventtypes')}
        >
          Plan Your Event
        </button>
      </div>

      {/* Events Features Section */}
      <section className="events-features">
        <h2 className="section-title">Our Event Services</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">
              <FaUtensils />
            </div>
            <h3>Weddings</h3>
            <p>Beautiful lakeside venues for your special day</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">
              <FaBed />
            </div>
            <h3>Corporate Events</h3>
            <p>Professional spaces for meetings and conferences</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">
              <FaWifi />
            </div>
            <h3>Social Gatherings</h3>
            <p>Perfect settings for celebrations and reunions</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">
              <FaSwimmingPool />
            </div>
            <h3>Custom Events</h3>
            <p>Tailored solutions for your unique requirements</p>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials-section">
        <h2 className="section-title">What Our Clients Say</h2>
        <p className="section-subtitle">Hear from those who've experienced our events</p>
        
        <div className="testimonials-container">
          <div className="testimonial-card">
            <div className="testimonial-content">
              <p>"{testimonials[activeTestimonial].content}"</p>
              <div className="testimonial-rating">
                {[...Array(5)].map((_, i) => (
                  <FaStar key={i} className={i < testimonials[activeTestimonial].rating ? "star filled" : "star"} />
                ))}
              </div>
            </div>
            <div className="testimonial-author">
              <h4>{testimonials[activeTestimonial].name}</h4>
              <p>{testimonials[activeTestimonial].role}</p>
            </div>
          </div>
          
          <div className="testimonial-nav">
            <button onClick={prevTestimonial} className="testimonial-arrow">‹</button>
            <div className="testimonial-dots">
              {testimonials.map((_, index) => (
                <span 
                  key={index}
                  className={`dot ${index === activeTestimonial ? 'active' : ''}`}
                  onClick={() => setActiveTestimonial(index)}
                ></span>
              ))}
            </div>
            <button onClick={nextTestimonial} className="testimonial-arrow">›</button>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="gallery-section">
        <h2 className="section-title">Event Gallery</h2>
        <p className="section-subtitle">See our venues in action</p>
        
        <div className="gallery-grid">
          {galleryImages.map((image) => (
            <div key={image.id} className="gallery-item">
              <img src={image.src} alt={image.alt} />
              <div className="gallery-overlay">
                <p>{image.alt}</p>
              </div>
            </div>
          ))}
        </div>
        
        <button className="view-all-btn" onClick={() => navigate('/gallery')}>
          View Full Gallery
        </button>
      </section>

      {/* Map Section */}
      <section className="map-section">
        <h2 className="section-title">Our Location</h2>
        <p className="section-subtitle">Visit us for a tour of our facilities</p>
        
        <div className="map-container">
          <MapContainer 
            center={[51.505, -0.09]} 
            zoom={13} 
            style={{ height: '400px', width: '100%', borderRadius: '10px' }}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <Marker position={[51.505, -0.09]}>
              <Popup>
                Nature's Lake Events <br /> 123 Lakeview Drive
              </Popup>
            </Marker>
          </MapContainer>
        </div>
        
        <div className="location-info">
          <div className="info-card">
            <FaMapMarkerAlt className="info-icon" />
            <h3>Address</h3>
            <p>123 Lakeview Drive</p>
            <p>Lakeside, CA 90210</p>
          </div>
          <div className="info-card">
            <FaPhone className="info-icon" />
            <h3>Phone</h3>
            <p>(555) 123-4567</p>
            <p>Mon-Fri: 9am-6pm</p>
          </div>
          <div className="info-card">
            <FaEnvelope className="info-icon" />
            <h3>Email</h3>
            <p>info@natureslake.com</p>
            <p>events@natureslake.com</p>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="newsletter-section">
        <div className="newsletter-content">
          <h2>Stay Updated</h2>
          <p>Subscribe to our newsletter for event tips, special offers, and venue updates.</p>
          
          {isSubscribed ? (
            <div className="subscription-success">
              Thank you for subscribing! You'll hear from us soon.
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="newsletter-form">
              <input 
                type="email" 
                placeholder="Your email address" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button type="submit">Subscribe</button>
            </form>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="main-footer">
        <div className="footer-container">
          <div className="footer-about">
            <h3>Nature's Lake Events</h3>
            <p>Creating memorable experiences in breathtaking lakeside settings since 2010.</p>
            <div className="social-links">
              <a href="#"><FaFacebook /></a>
              <a href="#"><FaTwitter /></a>
              <a href="#"><FaInstagram /></a>
              <a href="#"><FaLinkedin /></a>
            </div>
          </div>
          
          <div className="footer-links">
            <h3>Quick Links</h3>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/eventbooking">Book Event</Link></li>
              <li><Link to="/events-signin">Events Sign In</Link></li>
              <li><Link to="/rooms">Accommodation</Link></li>
              <li><Link to="/safaritypes">Safari Tours</Link></li>
              <li><Link to="/gallery">Gallery</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </div>
          
          <div className="footer-contact">
            <h3>Contact Us</h3>
            <p><FaMapMarkerAlt /> 123 Lakeview Drive, Lakeside, CA 90210</p>
            <p><FaPhone /> (555) 123-4567</p>
            <p><FaEnvelope /> info@natureslake.com</p>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} Nature's Lake Events. All rights reserved.</p>
          <div className="legal-links">
            <Link to="/privacy">Privacy Policy</Link>
            <Link to="/terms">Terms of Service</Link>
            <Link to="/cookies">Cookie Policy</Link>
          </div>
        </div>
      </footer>

      {/* Scroll to Top Button */}
      {showScroll && (
        <button className="scroll-to-top" onClick={scrollToTop}>
          <FaArrowUp />
        </button>
      )}
    </div>
  );
}

export default EventsHome;