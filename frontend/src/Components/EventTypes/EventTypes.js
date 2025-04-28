import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './EventTypes.css';

function EventTypes() {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);
    const [activeFilter, setActiveFilter] = useState('all');
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [user, setUser] = useState(null); // You can replace with your actual user state

    useEffect(() => {
        // Simulate loading delay for animations
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 1000);
        return () => clearTimeout(timer);
    }, []);

    const handleSignIn = () => {
        // Your sign in logic here
        console.log("Sign in clicked");
    };

    const eventTypes = [
        {
            id: 1,
            name: "Wedding",
            description: "Elegant wedding celebrations with customizable packages to make your special day unforgettable. Includes venue decoration, catering, photography, and more.",
            image: "/images/wedding.jpg",
            basePrice: 250000,
            category: "premium",
            rating: 4.9,
            duration: "Full day"
        },
        {
            id: 2,
            name: "Conference",
            description: "Professional conference facilities with state-of-the-art AV equipment, comfortable seating, and customizable layouts for productive business events.",
            image: "/images/conference.jpg",
            basePrice: 150000,
            category: "business",
            rating: 4.7,
            duration: "Half day"
        },
        {
            id: 3,
            name: "Birthday Party",
            description: "Fun celebrations for all ages with themed decorations, entertainment options, and delicious catering to make your birthday memorable.",
            image: "/images/birthday.jpg",
            basePrice: 75000,
            category: "social",
            rating: 4.8,
            duration: "4 hours"
        },
        {
            id: 4,
            name: "Corporate Retreat",
            description: "Team building and business meetings in a relaxing environment with activities, meeting spaces, and catering options to boost productivity.",
            image: "/images/retreat.jpg",
            basePrice: 200000,
            category: "business",
            rating: 4.6,
            duration: "2 days"
        },
        {
            id: 5,
            name: "Anniversary",
            description: "Romantic celebrations for milestone anniversaries with elegant decorations, fine dining, and photography services.",
            image: "/images/anniversary.jpg",
            basePrice: 120000,
            category: "social",
            rating: 4.7,
            duration: "6 hours"
        },
        {
            id: 6,
            name: "Product Launch",
            description: "Make a splash with your new product with our professional launch event services including staging, lighting, and multimedia support.",
            image: "/images/launch.jpg",
            basePrice: 300000,
            category: "premium",
            rating: 4.9,
            duration: "Custom"
        }
    ];

    const filteredEvents = activeFilter === 'all' 
        ? eventTypes 
        : eventTypes.filter(event => event.category === activeFilter);

    const handleBookNow = (eventType) => {
        navigate('/eventbooking', { state: { eventType } });
    };

    if (isLoading) {
        return (
            <div className="loading-screen">
                <div className="spinner"></div>
                <p>Loading our beautiful event spaces...</p>
            </div>
        );
    }

    return (
        <div className="event-page">
            <nav className={`main-navbar ${isMenuOpen ? 'open' : ''}`}>
                <div className="logo">🌍 Nature's Lake View Hotel</div>
                
                <div className="hamburger" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                    <div className="line"></div>
                    <div className="line"></div>
                    <div className="line"></div>
                </div>
                
                <ul className={`nav-links ${isMenuOpen ? 'open' : ''}`}>
                <li><a href="/events-home" onClick={() => setIsMenuOpen(false)}>Home</a></li>
                    <li><a href="/safari-home" onClick={() => setIsMenuOpen(false)}>Safari</a></li>
                    <li><a href="/events-home" onClick={() => setIsMenuOpen(false)}>Events</a></li>
                    <li><a href="#locations" onClick={() => setIsMenuOpen(false)}>About</a></li>
                    <li><a href="/EventDetails" onClick={() => setIsMenuOpen(false)}>My Bookings</a></li>
                    {!user && (
                        <li>
                           <Link to="/events-home" className="signin-btn" onClick={() => setIsMenuOpen(false)}>
                                         Sign Out
                                       </Link>
                        </li>
                    )}
                </ul>
            </nav>

            <div className="event-types-container">
                <div className="hero-section">
                    <h1 className="hero-title">Discover Your Perfect Event Space</h1>
                    <p className="hero-subtitle">Stunning venues tailored to your special occasion</p>
                    <div className="scroll-indicator">
                        <span></span>
                    </div>
                </div>
                
                <div className="filter-buttons">
                    <button 
                        className={activeFilter === 'all' ? 'active' : ''}
                        onClick={() => setActiveFilter('all')}
                    >
                        All Events
                    </button>
                    <button 
                        className={activeFilter === 'premium' ? 'active' : ''}
                        onClick={() => setActiveFilter('premium')}
                    >
                        Premium
                    </button>
                    <button 
                        className={activeFilter === 'business' ? 'active' : ''}
                        onClick={() => setActiveFilter('business')}
                    >
                        Business
                    </button>
                    <button 
                        className={activeFilter === 'social' ? 'active' : ''}
                        onClick={() => setActiveFilter('social')}
                    >
                        Social
                    </button>
                </div>
                
                <div className="event-grid">
                    {filteredEvents.map((event, index) => (
                        <div 
                            key={event.id} 
                            className="event-card"
                            style={{ animationDelay: `${index * 0.1}s` }}
                        >
                            <div className="card-image-container">
                                <img 
                                    src={event.image} 
                                    alt={event.name} 
                                    className="card-image"
                                    loading="lazy"
                                />
                                <div className="card-badge">
                                    <span className="rating">
                                        ★ {event.rating}
                                    </span>
                                    <span className="duration">
                                        {event.duration}
                                    </span>
                                </div>
                            </div>
                            <div className="event-info">
                                <h2>{event.name}</h2>
                                <p className="description">{event.description}</p>
                                <div className="price-container">
                                    <span className="price">From LKR {event.basePrice.toLocaleString()}</span>
                                    <button 
                                        className="book-now-btn"
                                        onClick={() => handleBookNow(event)}
                                    >
                                        <span>Book Now</span>
                                        <svg viewBox="0 0 13 10" height="10px" width="15px">
                                            <path d="M1,5 L11,5"></path>
                                            <polyline points="8 1 12 5 8 9"></polyline>
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                
                <div className="cta-section">
                    <h2>Can't Find What You're Looking For?</h2>
                    <p>Contact our event specialists to create a custom package just for you</p>
                    <button className="cta-button">Get a Custom Quote</button>
                </div>
            </div>
        </div>
    );
}

export default EventTypes;