import React, { useState, useEffect } from "react";
import { Carousel } from "react-responsive-carousel";
import { Link } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "leaflet/dist/leaflet.css";
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaFacebook, FaTwitter, FaInstagram, FaYoutube, FaArrowUp, FaStar, FaUtensils, FaBed, FaWifi, FaSwimmingPool } from "react-icons/fa";
import { animateScroll as scroll } from "react-scroll";
import "./Home.css";

// Fix for default marker icons in Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png')
});

const Home = () => {
  const [showScroll, setShowScroll] = useState(false);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [weather] = useState({
    type: "sunny",
    temperature: 28,
    description: "Sunny"
  });
  const [user, setUser] = useState(null); // Added user state

  // Hotel locations
  const locations = [
    { id: 1, name: 'Main Resort', position: [7.8567, 80.6493], type: 'resort' },
    { id: 2, name: 'Safari Base Camp', position: [7.8700, 80.6300], type: 'safari' },
    { id: 3, name: 'Event Venue', position: [7.8500, 80.6600], type: 'event' }
  ];

  // Seasonal offers
  const seasonalOffers = [
    {
      id: 1,
      title: "Summer Safari Special - 20% Off",
      description: "Enjoy our guided safari tours with exclusive summer discounts",
      image: "https://images.unsplash.com/photo-1523438885200-e635ba2c371e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
    },
    {
      id: 2,
      title: "Wedding Package - Complimentary Decor",
      description: "Book your dream wedding with our special decoration package",
      image: "https://images.unsplash.com/photo-1491933382434-500287f9b54b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
    },
    {
      id: 3,
      title: "Premium Wildlife Photography Tour",
      description: "Capture stunning wildlife moments with our expert guides",
      image: "https://images.unsplash.com/photo-1551632436-cbf8dd35adfa?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
    }
  ];

  // Testimonials
  const testimonials = [
    {
      id: 1,
      quote: "The safari experience was beyond incredible. We saw elephants, leopards, and so much more! Our guide was extremely knowledgeable.",
      author: "Nimal, Colombo",
      rating: 5
    },
    {
      id: 2,
      quote: "Our wedding at Nature's Lake was magical. The staff went above and beyond to make our day perfect. The lakeside venue was breathtaking.",
      author: "Dinuki, Kandy",
      rating: 5
    },
    {
      id: 3,
      quote: "The rooms are luxurious with amazing lake views. The food was exceptional and the service impeccable. Can't wait to return!",
      author: "Rajesh, Galle",
      rating: 4
    }
  ];

  // Hotel amenities
  const amenities = [
    { icon: <FaUtensils />, name: "Restaurant", description: "Fine dining with local flavors" },
    { icon: <FaBed />, name: "Luxury Rooms", description: "Comfort with stunning views" },
    { icon: <FaWifi />, name: "Free WiFi", description: "High-speed internet access" },
    { icon: <FaSwimmingPool />, name: "Infinity Pool", description: "Overlooking the lake" }
  ];

  // Handle sign in function
  const handleSignIn = () => {
    // In a real app, this would redirect to your sign-in page
    // For demo purposes, we'll just set a mock user
    setUser({
      name: "Guest User",
      email: "guest@example.com"
    });
    // Actual implementation might look like:
    // navigate('/signin');
  };

  // Weather icon component
  const WeatherIcon = ({ type }) => {
    const icons = {
      sunny: "☀️",
      rainy: "🌧️",
      cloudy: "☁️",
      default: "🌤️"
    };
    return <span className="weather-icon">{icons[type] || icons.default}</span>;
  };

  // Animated counter component
  const AnimatedCounter = ({ start, end, duration, suffix }) => {
    const [count, setCount] = useState(start);

    useEffect(() => {
      let startTimestamp = null;
      const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / (duration * 1000), 1);
        setCount(Math.floor(progress * (end - start) + start));
        if (progress < 1) {
          window.requestAnimationFrame(step);
        }
      };
      window.requestAnimationFrame(step);
    }, [start, end, duration]);

    return (
      <div className="counter">
        <span>{count}</span>
        <span>{suffix}</span>
      </div>
    );
  };

  // Rating stars component
  const renderRatingStars = (rating) => {
    return Array(5).fill(0).map((_, i) => (
      <FaStar key={i} className={i < rating ? "star filled" : "star"} />
    ));
  };

  // Scroll to top function
  const scrollToTop = () => {
    scroll.scrollToTop();
  };

  // Check scroll position for scroll-to-top button
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

  return (
    <div className="home">
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
              <button className="signin-btn" onClick={handleSignIn}>
                Sign In
              </button>
            </li>
          )}
        </ul>
      </nav>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>NATURE'S LAKE VIEW DAMBULLA</h1>
          <p className="location">Near Randeniya Lake, 21100, Dambulla 21100</p>
          <p className="phone">94-71-4418716</p>
          
          {/* Booking Options */}
          <div className="booking-options">
            <div className="booking-option safari">
              <h3>Safari Adventures</h3>
              <p>Explore the wild with our guided safari tours</p>
              <Link to="/safari-signin" className="book-btn">Book Safari</Link>
            </div>
            <div className="booking-option events">
              <h3>Event Spaces</h3>
              <p>Host your special events in our beautiful venues</p>
              <Link to="/eventtypes" className="book-btn">Book Event</Link>
            </div>
            <div className="booking-option accommodation">
              <h3>Luxury Accommodation</h3>
              <p>Stay in our premium rooms with lake views</p>
              <Link to="/rooms" className="book-btn">Book Room</Link>
            </div>
          </div>
        </div>
        
        <div className="scroll-indicator">
          <div className="mouse">
            <div className="scroller"></div>
          </div>
          <span>Scroll Down</span>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="about-section">
        <div className="section-container">
          <h2 className="section-title">About Nature's Lake</h2>
          <p className="section-subtitle">A sanctuary where luxury meets wilderness</p>
          
          <div className="about-content">
            <div className="about-text">
              <p>
                Nestled on the shores of Randeniya Lake, Nature's Lake View Dambulla offers a unique 
                blend of luxury accommodation and thrilling safari experiences. Established in 2005, 
                we've been providing unforgettable experiences to travelers from around the world.
              </p>
              <p>
                Our resort spans over 50 acres of pristine wilderness, offering guests the opportunity 
                to witness Sri Lanka's incredible biodiversity while enjoying world-class amenities 
                and service.
              </p>
              
              <div className="stats-container">
                <div className="stat-item">
                  <AnimatedCounter start={0} end={15} duration={2} suffix="+" />
                  <span className="stat-label">Years of Excellence</span>
                </div>
                <div className="stat-item">
                  <AnimatedCounter start={0} end={127} duration={3} suffix="+" />
                  <span className="stat-label">Wildlife Species</span>
                </div>
                <div className="stat-item">
                  <AnimatedCounter start={0} end={98} duration={2} suffix="%" />
                  <span className="stat-label">Guest Satisfaction</span>
                </div>
              </div>
            </div>
            
            <div className="about-image">
              <img src="https://images.unsplash.com/photo-1582719471383-0d0d2066a1bc?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" alt="Nature's Lake Resort" />
            </div>
          </div>
        </div>
      </section>

      {/* Amenities Section */}
      <section className="amenities-section">
        <div className="section-container">
          <h2 className="section-title">Our Amenities</h2>
          <p className="section-subtitle">Designed for your comfort and enjoyment</p>
          
          <div className="amenities-grid">
            {amenities.map((amenity, index) => (
              <div key={index} className="amenity-card">
                <div className="amenity-icon">{amenity.icon}</div>
                <h3>{amenity.name}</h3>
                <p>{amenity.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Seasonal Specials Carousel */}
      <section id="offers" className="seasonal-specials">
        <div className="section-container">
          <h2 className="section-title">Seasonal Specials</h2>
          <p className="section-subtitle">Exclusive offers for our valued guests</p>
          
          <Carousel 
            autoPlay 
            interval={5000}
            infiniteLoop
            showThumbs={false}
            showStatus={false}
            selectedItem={currentSlide}
            onChange={(index) => setCurrentSlide(index)}
            className="offer-carousel"
          >
            {seasonalOffers.map(offer => (
              <div key={offer.id} className="carousel-slide">
                <img src={offer.image} alt={offer.title} />
                <div className="slide-content">
                  <h3>{offer.title}</h3>
                  <p>{offer.description}</p>
                  <button className="carousel-cta">
                    {offer.title.includes('Safari') ? (
                      <Link to="/safaritypes">View Offer</Link>
                    ) : offer.title.includes('Wedding') ? (
                      <Link to="/eventtypes">View Offer</Link>
                    ) : (
                      <Link to="/rooms">View Offer</Link>
                    )}
                  </button>
                </div>
              </div>
            ))}
          </Carousel>
          
          <div className="carousel-dots">
            {seasonalOffers.map((_, index) => (
              <div 
                key={index}
                className={`dot ${index === currentSlide ? 'active' : ''}`}
                onClick={() => setCurrentSlide(index)}
              ></div>
            ))}
          </div>
        </div>
      </section>

      {/* Weather Widget */}
      <section className="weather-widget">
        <div className="section-container">
          <h2 className="section-title">Current Weather</h2>
          <p className="section-subtitle">Plan your activities with our weather updates</p>
          
          <div className="weather-card">
            <WeatherIcon type={weather.type} />
            <div className="weather-info">
              <span className="temp">{weather.temperature}°C</span>
              <span className="desc">{weather.description}</span>
            </div>
            <p>Perfect conditions for outdoor activities!</p>
            
            <div className="weather-forecast">
              <div className="forecast-item">
                <span>Mon</span>
                <span>☀️</span>
                <span>28°C</span>
              </div>
              <div className="forecast-item">
                <span>Tue</span>
                <span>⛅</span>
                <span>27°C</span>
              </div>
              <div className="forecast-item">
                <span>Wed</span>
                <span>☀️</span>
                <span>29°C</span>
              </div>
              <div className="forecast-item">
                <span>Thu</span>
                <span>🌧️</span>
                <span>26°C</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Wildlife Counter */}
      <section id="wildlife" className="wildlife-counter">
        <div className="section-container">
          <h2 className="section-title">Our Wildlife Sanctuary</h2>
          <p className="section-subtitle">Discover the rich biodiversity of our ecosystem</p>
          
          <div className="counter-container">
            <div className="counter-item">
              <AnimatedCounter start={0} end={127} duration={3} suffix="+" />
              <p>Documented wildlife species</p>
            </div>
            <div className="counter-item">
              <AnimatedCounter start={0} end={42} duration={3} suffix="+" />
              <p>Elephants in our conservation area</p>
            </div>
            <div className="counter-item">
              <AnimatedCounter start={0} end={15} duration={3} suffix="+" />
              <p>Leopard sightings this year</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="testimonials-section">
        <div className="section-container">
          <h2 className="section-title">Guest Experiences</h2>
          <p className="section-subtitle">What our guests say about their stay</p>
          
          <div className="testimonials-container">
            {testimonials.map((testimonial, index) => (
              <div 
                key={testimonial.id}
                className={`testimonial ${index === activeTestimonial ? 'active' : ''}`}
              >
                <div className="quote">"{testimonial.quote}"</div>
                <div className="rating">
                  {renderRatingStars(testimonial.rating)}
                </div>
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

      {/* Location Map Section */}
      <section id="location" className="location-section">
        <div className="section-container">
          <h2 className="section-title">Our Location</h2>
          <p className="section-subtitle">Find us in the heart of Sri Lanka's cultural triangle</p>
          
          <div className="map-container">
            <MapContainer 
              center={[7.8567, 80.6493]} 
              zoom={13} 
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
                      <p>{location.type === 'resort' ? 'Main Resort' : 
                          location.type === 'safari' ? 'Safari Base Camp' : 'Event Venue'}</p>
                      <button className="map-popup-btn">
                        {location.type === 'resort' ? (
                          <Link to="/rooms">View Accommodation</Link>
                        ) : location.type === 'safari' ? (
                          <Link to="/safaritypes">View Safari Tours</Link>
                        ) : (
                          <Link to="/eventtypes">View Venue</Link>
                        )}
                      </button>
                    </div>
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          </div>
          
          <div className="location-info">
            <div className="info-item">
              <FaMapMarkerAlt className="info-icon" />
              <div>
                <h3>Address</h3>
                <p>Near Randeniya Lake, 21100, Dambulla, Sri Lanka</p>
              </div>
            </div>
            <div className="info-item">
              <FaPhone className="info-icon" />
              <div>
                <h3>Phone</h3>
                <p>+94 71 441 8716 (24/7)</p>
                <p>+94 11 234 5678 (Office)</p>
              </div>
            </div>
            <div className="info-item">
              <FaEnvelope className="info-icon" />
              <div>
                <h3>Email</h3>
                <p>reservations@natureslake.com</p>
                <p>info@natureslake.com</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="newsletter-section">
        <div className="section-container">
          <div className="newsletter-content">
            <h2>Subscribe to Our Newsletter</h2>
            <p>Receive exclusive offers, safari updates, and special events</p>
            <form className="newsletter-form">
              <input type="email" placeholder="Enter your email address" required />
              <button type="submit">Subscribe</button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-section">
            <h3>Nature's Lake</h3>
            <p>
              A premier safari and resort destination in Sri Lanka's cultural triangle, 
              offering unforgettable experiences in the heart of nature.
            </p>
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
          
          <div className="footer-section">
            <h3>Quick Links</h3>
            <ul>
              <li><Link to="/safaritypes">Safari Tours</Link></li>
              <li><Link to="/eventtypes">Event Spaces</Link></li>
              <li><Link to="/rooms">Accommodation</Link></li>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/gallery">Photo Gallery</Link></li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h3>Contact Us</h3>
            <ul>
              <li><FaMapMarkerAlt /> Near Randeniya Lake, Dambulla</li>
              <li><FaPhone /> +94 71 441 8716</li>
              <li><FaEnvelope /> info@natureslake.com</li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h3>Business Hours</h3>
            <ul>
              <li>Front Desk: 24/7</li>
              <li>Restaurant: 6:30 AM - 10:30 PM</li>
              <li>Safari Office: 5:30 AM - 8:00 PM</li>
              <li>Event Office: 8:00 AM - 6:00 PM</li>
            </ul>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} Nature's Lake View Dambulla. All rights reserved.</p>
          <div className="footer-links">
            <Link to="/privacy">Privacy Policy</Link>
            <Link to="/terms">Terms of Service</Link>
            <Link to="/sitemap">Sitemap</Link>
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
};

export default Home;