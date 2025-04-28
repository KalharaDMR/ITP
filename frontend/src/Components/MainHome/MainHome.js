import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaFacebook, FaTwitter, FaInstagram, FaYoutube, FaArrowUp } from 'react-icons/fa';
import { animateScroll as scroll } from 'react-scroll';
import './MainHome.css';

// Fix for default marker icons in Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png')
});

function MainHome() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [showScroll, setShowScroll] = useState(false);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Our locations data
  const locations = [
    { id: 1, name: 'Yala National Park', position: [6.3779, 81.5189], type: 'safari' },
    { id: 2, name: 'Wilpattu National Park', position: [8.4500, 80.0000], type: 'safari' },
    { id: 3, name: 'Colombo Event Hall', position: [6.9271, 79.8612], type: 'event' },
    { id: 4, name: 'Kandy Hillside Venue', position: [7.2906, 80.6337], type: 'event' }
  ];

  const testimonials = [
    {
      id: 1,
      quote: "The safari tour was a life-changing experience. Our guide was incredibly knowledgeable and we saw so much wildlife!",
      author: "Nimal, Colombo",
      rating: 5
    },
    {
      id: 2,
      quote: "Booked our engagement at their hilltop venue — simply magical! The sunset views were breathtaking.",
      author: "Dinuki, Kandy",
      rating: 5
    },
    {
      id: 3,
      quote: "Excellent service from start to finish. The team helped us organize a corporate retreat that was both productive and fun.",
      author: "Rajesh, Galle",
      rating: 4
    }
  ];

  useEffect(() => {
    const checkScroll = () => {
      if (!showScroll && window.pageYOffset > 400) {
        setShowScroll(true);
      } else if (showScroll && window.pageYOffset <= 400) {
        setShowScroll(false);
      }
    };

    // Auto-rotate testimonials
    const testimonialInterval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    window.addEventListener('scroll', checkScroll);
    return () => {
      window.removeEventListener('scroll', checkScroll);
      clearInterval(testimonialInterval);
    };
  }, [showScroll, testimonials.length]);

  const handleSafariClick = () => {
    navigate(user ? '/safaritypes' : '/safari-home');
  };

  const handleEventsClick = () => {
    navigate(user ? '/eventtypes' : '/events-home');
  };

  const handleSignIn = () => {
    navigate('/signin', { state: { from: '/' } });
  };

  const scrollToTop = () => {
    scroll.scrollToTop();
  };

  const renderRatingStars = (rating) => {
    return Array(5).fill(0).map((_, i) => (
      <span key={i} className={i < rating ? "star filled" : "star"}>&#9733;</span>
    ));
  };

  return (
    <div className="main-home-container">
      {/* Navigation Bar */}
      <nav className={`main-navbar ${isMenuOpen ? 'open' : ''}`}>
        <div className="logo">🌍 Nature's Lake View Hotel</div>
        
        <div className="hamburger" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          <div className="line"></div>
          <div className="line"></div>
          <div className="line"></div>
        </div>
        
        <ul className={`nav-links ${isMenuOpen ? 'open' : ''}`}>
          <li onClick={() => { window.scrollTo(0, 0); setIsMenuOpen(false); }}>Home</li>
          <li><a href="#about" onClick={() => setIsMenuOpen(false)}>About</a></li>
          <li><a href="#services" onClick={() => setIsMenuOpen(false)}>Services</a></li>
          <li><a href="#locations" onClick={() => setIsMenuOpen(false)}>Locations</a></li>
          <li><a href="#testimonials" onClick={() => setIsMenuOpen(false)}>Testimonials</a></li>
          <li><a href="#contact" onClick={() => setIsMenuOpen(false)}>Contact</a></li>
          {!user && (
            <li>
              <button className="signin-btn" onClick={() => (handleSignIn(), navigate('/safari-signin'))}>Sign In
              </button>
            </li>
          )}
        </ul>
      </nav>

      {/* Hero Section */}
      <header className="hero-section">
        <div className="hero-overlay">
          <div className="hero-content">
            <h1>Discover Nature. Celebrate Life.</h1>
            <p>Plan your next adventure or event & safari with ease and elegance</p>
            <div className="hero-buttons">
              <button onClick={handleSafariClick}>Explore Safari</button>
              <button onClick={handleEventsClick}>Book Event</button>
            </div>
          </div>
        </div>
        <div className="scroll-indicator">
          <div className="mouse">
            <div className="scroller"></div>
          </div>
          <span>Scroll Down</span>
        </div>
      </header>

      {/* About Section */}
      <section id="about" className="about-section">
        <div className="section-container">
          <h2 className="section-title">About Us</h2>
          <div className="about-content">
            <div className="about-text">
              <p>
                Welcome to <strong>Safari & Events Hub</strong>, your premier destination for unforgettable wildlife 
                adventures and elegant event experiences across Sri Lanka. Founded in 2010, we've been 
                connecting people with nature and helping them celebrate life's special moments in style.
              </p>
              <p>
                Our team of passionate professionals includes wildlife experts, event planners, and 
                hospitality specialists who work together to create seamless experiences for our clients.
              </p>
              <div className="stats-container">
                <div className="stat-item">
                  <span className="stat-number">500+</span>
                  <span className="stat-label">Safaris Organized</span>
                </div>
                <div className="stat-item">
                  <span className="stat-number">300+</span>
                  <span className="stat-label">Events Hosted</span>
                </div>
                <div className="stat-item">
                  <span className="stat-number">98%</span>
                  <span className="stat-label">Customer Satisfaction</span>
                </div>
              </div>
            </div>
            <div className="about-image">
              <img src="/images/mainbg.jpg" alt="Safari Adventure" className="about-img" />
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="services-section">
        <div className="section-container">
          <h2 className="section-title">Our Services</h2>
          <p className="section-subtitle">Discover what we offer to make your experiences unforgettable</p>
          
          <div className="service-cards">
            <div className="service-card" onClick={handleSafariClick}>
              <div className="card-icon">
                <img src="/images/safari-icon.png" alt="Safari" />
              </div>
              <h3>Safari Tours</h3>
              <p>
                Immerse yourself in Sri Lanka's incredible biodiversity with our expertly guided safari tours. 
                Choose from half-day excursions to multi-day adventures.
              </p>
              <ul className="service-features">
                <li>Expert wildlife guides</li>
                <li>Customizable itineraries</li>
                <li>Photography-focused tours</li>
                <li>Family-friendly options</li>
              </ul>
            </div>
            
            <div className="service-card" onClick={handleEventsClick}>
              <div className="card-icon">
                <img src="/images/eventspaces.jpg" alt="Events" />
              </div>
              <h3>Event Spaces</h3>
              <p>
                Host your special occasions at our stunning venues, from beachfront weddings to corporate retreats 
                in the hills.
              </p>
              <ul className="service-features">
                <li>Full event planning services</li>
                <li>Catering options</li>
                <li>AV equipment available</li>
                <li>Accommodation packages</li>
              </ul>
            </div>
            
            <div className="service-card">
              <div className="card-icon">
                <img src="/images/safari.jpg" alt="Transport" />
              </div>
              <h3>Transportation</h3>
              <p>
                Comfortable and reliable transportation services for all your needs, including airport transfers 
                and group transportation.
              </p>
              <ul className="service-features">
                <li>Luxury vehicles</li>
                <li>Experienced drivers</li>
                <li>24/7 availability</li>
                <li>Child seats available</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Locations Map Section */}
      <section id="locations" className="locations-section">
        <div className="section-container">
          <h2 className="section-title">Our Locations</h2>
          <p className="section-subtitle">Explore our safari and event locations across Sri Lanka</p>
          
          <div className="map-container">
            <MapContainer 
              center={[7.8731, 80.7718]} 
              zoom={7} 
              style={{ height: '500px', width: '100%', borderRadius: '15px' }}
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />
              {locations.map(location => (
                <Marker key={location.id} position={location.position}>
                  <Popup>
                    <div className="map-popup">
                      <h4>{location.name}</h4>
                      <p>{location.type === 'safari' ? 'Safari Location' : 'Event Venue'}</p>
                      <button 
                        className="map-popup-btn"
                        onClick={() => navigate(`/${location.type}-home`)}
                      >
                        View {location.type === 'safari' ? 'Safari' : 'Venue'} Details
                      </button>
                    </div>
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          </div>
          
          <div className="location-cards">
            {locations.map(location => (
              <div key={location.id} className="location-card">
                <div className="location-icon">
                  <FaMapMarkerAlt />
                </div>
                <h3>{location.name}</h3>
                <p className="location-type">{location.type === 'safari' ? 'Safari Park' : 'Event Venue'}</p>
                <button 
                  className="location-btn"
                  onClick={() => navigate(`/${location.type}-home`)}
                >
                  Learn More
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="testimonials-section">
        <div className="section-container">
          <h2 className="section-title">What Our Clients Say</h2>
          <p className="section-subtitle">Hear from people who've experienced our services</p>
          
          <div className="testimonials-container">
            {testimonials.map((testimonial, index) => (
              <div 
                key={testimonial.id}
                className={`testimonial ${index === activeTestimonial ? 'active' : ''}`}
              >
                <div className="quote">"{testimonial.quote}"</div>
                <div className="rating">{renderRatingStars(testimonial.rating)}</div>
                <div className="author">- {testimonial.author}</div>
              </div>
            ))}
          </div>
          
          <div className="testimonial-dots">
            {testimonials.map((_, index) => (
              <div 
                key={index}
                className={`dot ${index === activeTestimonial ? 'active' : ''}`}
                onClick={() => setActiveTestimonial(index)}
              ></div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="contact-section">
        <div className="section-container">
          <h2 className="section-title">Contact Us</h2>
          <p className="section-subtitle">Get in touch for bookings and inquiries</p>
          
          <div className="contact-content">
            <div className="contact-info">
              <div className="info-item">
                <div className="info-icon">
                  <FaMapMarkerAlt />
                </div>
                <div className="info-text">
                  <h3>Our Office</h3>
                  <p>123 Safari Road, Colombo 05, Sri Lanka</p>
                </div>
              </div>
              
              <div className="info-item">
                <div className="info-icon">
                  <FaPhone />
                </div>
                <div className="info-text">
                  <h3>Phone</h3>
                  <p>+94 11 234 5678</p>
                  <p>+94 77 123 4567 (24/7 Hotline)</p>
                </div>
              </div>
              
              <div className="info-item">
                <div className="info-icon">
                  <FaEnvelope />
                </div>
                <div className="info-text">
                  <h3>Email</h3>
                  <p>info@safarievents.com</p>
                  <p>bookings@safarievents.com</p>
                </div>
              </div>
              
              <div className="social-links">
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                  <FaFacebook />
                </a>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                  <FaTwitter />
                </a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                  <FaInstagram />
                </a>
                <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">
                  <FaYoutube />
                </a>
              </div>
            </div>
            
            <form className="contact-form">
              <div className="form-group">
                <input type="text" placeholder="Your Name" required />
              </div>
              <div className="form-group">
                <input type="email" placeholder="Email Address" required />
              </div>
              <div className="form-group">
                <input type="tel" placeholder="Phone Number" />
              </div>
              <div className="form-group">
                <select>
                  <option value="">Select Service</option>
                  <option value="safari">Safari Tour</option>
                  <option value="event">Event Booking</option>
                  <option value="transport">Transportation</option>
                  <option value="other">Other Inquiry</option>
                </select>
              </div>
              <div className="form-group">
                <textarea placeholder="Your Message" rows="5" required></textarea>
              </div>
              <button type="submit" className="submit-btn">Send Message</button>
            </form>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="newsletter-section">
        <div className="section-container">
          <div className="newsletter-content">
            <h2>Subscribe to Our Newsletter</h2>
            <p>Get updates on special offers, new locations, and safari tips</p>
            <form className="newsletter-form">
              <input type="email" placeholder="Enter your email" required />
              <button type="submit">Subscribe</button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="main-footer">
        <div className="footer-content">
          <div className="footer-section">
            <h3>Safari & Events Hub</h3>
            <p>
              Your premier destination for wildlife adventures and elegant event experiences 
              across Sri Lanka since 2010.
            </p>
          </div>
          
          <div className="footer-section">
            <h3>Quick Links</h3>
            <ul>
              <li><a href="#about">About Us</a></li>
              <li><a href="#services">Services</a></li>
              <li><a href="#locations">Locations</a></li>
              <li><a href="#testimonials">Testimonials</a></li>
              <li><a href="#contact">Contact</a></li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h3>Services</h3>
            <ul>
              <li><a onClick={handleSafariClick}>Safari Tours</a></li>
              <li><a onClick={handleEventsClick}>Event Spaces</a></li>
              <li><a>Transportation</a></li>
              <li><a>Accommodation</a></li>
              <li><a>Custom Packages</a></li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h3>Contact Info</h3>
            <ul>
              <li><FaMapMarkerAlt /> 123 Safari Road, Colombo 05</li>
              <li><FaPhone /> +94 11 234 5678</li>
              <li><FaEnvelope /> info@safarievents.com</li>
            </ul>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} Safari & Events Hub. All Rights Reserved.</p>
          <div className="footer-links">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
            <a href="#">Sitemap</a>
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

export default MainHome;