import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { FaLock, FaEdit, FaCheckCircle, FaArrowLeft } from 'react-icons/fa';
import './Payment.css';

function Payment() {
    const location = useLocation();
    const navigate = useNavigate();
    const { 
        FirstName = '', 
        LastName = '', 
        Email = '', 
        SafariType = '', 
        BookingDate = '', 
        NoOfAdults = 0,
        NoOfKids = 0,
        totalCost = 0,
        ContactNumber = '',
        Nationality = '',
        bookingId = ''
    } = location.state || {};

    const [isProcessing, setIsProcessing] = useState(false);
    const [paymentSuccess, setPaymentSuccess] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handlePayment = () => {
        setIsProcessing(true);
        
        // Simulate payment processing
        setTimeout(() => {
            setIsProcessing(false);
            triggerSuccessAnimation();
            setTimeout(() => {
                navigate('/paymentgateway', { 
                    state: { 
                        FirstName, 
                        LastName, 
                        SafariType, 
                        totalCost,
                        type: 'safari',
                        referenceId: bookingId
                    } 
                });
            }, 2000);
        }, 1500);
    };

    const triggerSuccessAnimation = () => {
        setPaymentSuccess(true);
        createParticles();
    };

    const createParticles = () => {
        const colors = ['#6e45e2', '#88d3ce', '#ff7e5f', '#2ecc71'];
        const container = document.querySelector('.payment-container');
        
        for (let i = 0; i < 50; i++) {
            const particle = document.createElement('div');
            particle.className = 'success-particle';
            particle.style.setProperty('--tx', `${Math.random() * 200 - 100}px`);
            particle.style.setProperty('--ty', `${Math.random() * 200 - 100}px`);
            particle.style.background = colors[Math.floor(Math.random() * colors.length)];
            particle.style.left = `${50 + Math.random() * 10}%`;
            particle.style.top = `${50 + Math.random() * 10}%`;
            container.appendChild(particle);
            
            // Remove particle after animation
            setTimeout(() => {
                particle.remove();
            }, 1000);
        }
    };

    const handleEdit = () => {
        navigate('/add-room', { state: location.state });
    };

    // Add holographic tilt effect
    useEffect(() => {
        const card = document.querySelector('.payment-details');
        
        const handleMove = (e) => {
            const x = e.clientX - card.getBoundingClientRect().left;
            const y = e.clientY - card.getBoundingClientRect().top;
            
            const centerX = card.offsetWidth / 2;
            const centerY = card.offsetHeight / 2;
            
            const rotateY = (x - centerX) / 20;
            const rotateX = (centerY - y) / 20;
            
            card.style.setProperty('--rotate-x', `${rotateX}deg`);
            card.style.setProperty('--rotate-y', `${rotateY}deg`);
        };
        
        if (card) {
            card.addEventListener('mousemove', handleMove);
            return () => card.removeEventListener('mousemove', handleMove);
        }
    }, []);

    return (
        <div className="payment-page">
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
                    <li><a href="#about" onClick={() => setIsMenuOpen(false)}>Safari</a></li>
                    <li><a href="#services" onClick={() => setIsMenuOpen(false)}>Events</a></li>
                    <li><a href="#locations" onClick={() => setIsMenuOpen(false)}>About</a></li>
                    <li><a href="#testimonials" onClick={() => setIsMenuOpen(false)}>My Bookings</a></li>
                    <li><a href="#contact" onClick={() => setIsMenuOpen(false)}>Contact</a></li>
                    <li>
                        <Link to="/safari-home" className="signin-btn">
                            Sign Out
                        </Link>
                    </li>
                </ul>
            </nav>

            <div className="payment-container">
                <button className="back-button" onClick={() => navigate(-1)}>
                    <FaArrowLeft /> Back
                </button>

                <h1>Payment Summary</h1>
                
                <div className="payment-details">
                    <h2>Booking Details</h2>
                    
                    <div className="detail-item">
                        <strong>Name:</strong> 
                        <span>{FirstName} {LastName}</span>
                    </div>
                    
                    <div className="detail-item">
                        <strong>Email:</strong> 
                        <span>{Email}</span>
                    </div>

                    <div className="detail-item">
                        <strong>Contact Number:</strong> 
                        <span>{ContactNumber || 'Not provided'}</span>
                    </div>

                    <div className="detail-item">
                        <strong>Nationality:</strong> 
                        <span>{Nationality || 'Not specified'}</span>
                    </div>
                    
                    <div className="detail-item">
                        <strong>Safari Type:</strong> 
                        <span>{SafariType || 'Not specified'}</span>
                    </div>
                    
                    <div className="detail-item">
                        <strong>Booking Date:</strong> 
                        <span>{BookingDate ? new Date(BookingDate).toLocaleDateString() : 'Not specified'}</span>
                    </div>
                    
                    <div className="detail-item">
                        <strong>Number of Adults:</strong> 
                        <span>{NoOfAdults}</span>
                    </div>

                    <div className="detail-item">
                        <strong>Number of Kids:</strong> 
                        <span>{NoOfKids}</span>
                    </div>
                    
                    <div className="total-price">
                        <span>Total Amount:</span>
                        <span>LKR {Number(totalCost).toLocaleString()}</span>
                    </div>
                </div>
                
                <div className="payment-actions">
                    <button 
                        onClick={handlePayment} 
                        className="pay-now-btn"
                        disabled={isProcessing || paymentSuccess}
                    >
                        {isProcessing ? (
                            <>
                                <span className="loading-spinner"></span>
                                Processing...
                            </>
                        ) : paymentSuccess ? (
                            <>
                                <FaCheckCircle /> Success!
                            </>
                        ) : (
                            <>
                                <FaLock /> Pay Now
                            </>
                        )}
                    </button>
                    
                    <button 
                        onClick={handleEdit} 
                        className="edit-btn"
                        disabled={isProcessing || paymentSuccess}
                    >
                        <FaEdit /> Edit Booking
                    </button>
                </div>
                
                {paymentSuccess && (
                    <div className="success-message">
                        Payment successful! Redirecting...
                    </div>
                )}
            </div>
        </div>
    );
}

export default Payment;