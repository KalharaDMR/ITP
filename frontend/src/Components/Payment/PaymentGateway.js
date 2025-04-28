import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { FaLock, FaArrowLeft, FaCreditCard, FaCalendarAlt, FaUserShield } from 'react-icons/fa';
import { SiVisa, SiMastercard, SiAmericanexpress, SiDiscover } from 'react-icons/si';
import './PaymentGateway.css';

function PaymentGateway() {
  const location = useLocation();
  const navigate = useNavigate();
  const { 
    totalCost = 0, 
    FirstName = '', 
    LastName = '', 
    SafariType = '', 
    NoOfAdults = 0, 
    NoOfKids = 0,
    EventType = '',
    GuestCount = 0,
    type = 'safari',
    ContactNumber = '',
    Nationality = ''
  } = location.state || {};

  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [cardType, setCardType] = useState('');
  const [errors, setErrors] = useState({});
  const [isProcessing, setIsProcessing] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Fix for card validation
  const validateForm = () => {
    const newErrors = {};
    const cleanedCardNumber = cardNumber.replace(/\s/g, '');
    
    if (!cleanedCardNumber.match(/^\d{13,16}$/)) {
      newErrors.cardNumber = 'Invalid card number (13-16 digits)';
    }
    
    if (!expiryDate.match(/^(0[1-9]|1[0-2])\/\d{2}$/)) {
      newErrors.expiryDate = 'Invalid expiry date (MM/YY)';
    } else {
      // Additional expiry date validation
      const [month, year] = expiryDate.split('/');
      const currentYear = new Date().getFullYear() % 100;
      const currentMonth = new Date().getMonth() + 1;
      
      if (parseInt(year) < currentYear || 
          (parseInt(year) === currentYear && parseInt(month) < currentMonth)) {
        newErrors.expiryDate = 'Card has expired';
      }
    }
    
    if (!cvv.match(/^\d{3,4}$/)) {
      newErrors.cvv = cardType === 'Amex' ? 'Invalid CID (4 digits)' : 'Invalid CVV (3 digits)';
    }
    
    if (!cardType) {
      newErrors.cardType = 'Please select a card type';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      setIsProcessing(true);
      
      // Simulate payment processing
      setTimeout(() => {
        const paymentDetails = {
          ...location.state,
          paymentType: type,
          paymentDate: new Date().toISOString(),
          transactionId: `TXN-${Math.floor(Math.random() * 1000000)}`,
          cardLastFour: cardNumber.replace(/\s/g, '').slice(-4)
        };
        
        navigate('/paymentsuccess', { state: paymentDetails });
      }, 1500);
    }
  };

  const handleCardNumberChange = (e) => {
    let value = e.target.value.replace(/\D/g, '');
    
    // Format based on card type
    if (value.length > 16) value = value.slice(0, 16);
    
    // Add spaces every 4 digits
    value = value.replace(/(\d{4})(?=\d)/g, '$1 ');
    
    setCardNumber(value);
    
    // Detect card type
    if (/^4/.test(value)) {
      setCardType('Visa');
    } else if (/^5[1-5]/.test(value)) {
      setCardType('MasterCard');
    } else if (/^3[47]/.test(value)) {
      setCardType('Amex');
    } else if (/^6(?:011|5)/.test(value)) {
      setCardType('Discover');
    } else {
      setCardType('');
    }
  };

  const handleExpiryChange = (e) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 4) value = value.slice(0, 4);
    if (value.length > 2) value = value.replace(/(\d{2})(\d{0,2})/, '$1/$2');
    setExpiryDate(value);
  };

  const handleCvvChange = (e) => {
    const maxLength = cardType === 'Amex' ? 4 : 3;
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > maxLength) value = value.slice(0, maxLength);
    setCvv(value);
  };

  // Add card flip animation on CVV focus
  const handleCvvFocus = () => {
    document.querySelector('.card-preview').classList.add('flipped');
  };

  const handleCvvBlur = () => {
    document.querySelector('.card-preview').classList.remove('flipped');
  };

  return (
    <div className="payment-gateway-page">
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

      <div className="payment-gateway-container">
        <button className="back-button" onClick={() => navigate(-1)}>
          <FaArrowLeft /> Back
        </button>

        <div className="payment-header">
          <h2 className="payment-title">Payment Details</h2>
          <div className="payment-progress">
            <div className="progress-step active">1. Booking</div>
            <div className="progress-step active">2. Payment</div>
            <div className="progress-step">3. Confirmation</div>
          </div>
        </div>

        <div className="payment-content">
          <div className="booking-summary">
            <h3>Booking Summary</h3>
            {type === 'safari' ? (
              <>
                <p><strong>Safari Type:</strong> {SafariType}</p>
                <p><strong>Adults:</strong> {NoOfAdults}, <strong>Kids:</strong> {NoOfKids}</p>
              </>
            ) : (
              <>
                <p><strong>Event Type:</strong> {EventType}</p>
                <p><strong>Guests:</strong> {GuestCount}</p>
              </>
            )}
            <p><strong>Name:</strong> {FirstName} {LastName}</p>
            <p><strong>Contact:</strong> {ContactNumber}</p>
            <p><strong>Nationality:</strong> {Nationality}</p>
          </div>

          <div className="card-preview">
            <div className="card-front">
              <div className="card-type">{cardType || 'Credit Card'}</div>
              <div className="card-number">
                {cardNumber || '•••• •••• •••• ••••'}
              </div>
              <div className="card-details">
                <div className="card-holder">{FirstName} {LastName}</div>
                <div className="card-expiry">{expiryDate || '••/••'}</div>
              </div>
            </div>
            <div className="card-back">
              <div className="card-stripe"></div>
              <div className="card-cvv">{cvv ? '•'.repeat(cvv.length) : '•••'}</div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="payment-form">
            <div className="form-group">
              <label>Card Number</label>
              <div className="card-input-container">
                <FaCreditCard className="input-icon" />
                <input
                  type="text"
                  value={cardNumber}
                  onChange={handleCardNumberChange}
                  placeholder="1234 5678 9012 3456"
                  className={errors.cardNumber ? 'input-error' : ''}
                />
                <div className="card-icons">
                  <SiVisa className={cardType === 'Visa' ? 'active' : ''} />
                  <SiMastercard className={cardType === 'MasterCard' ? 'active' : ''} />
                  <SiAmericanexpress className={cardType === 'Amex' ? 'active' : ''} />
                  <SiDiscover className={cardType === 'Discover' ? 'active' : ''} />
                </div>
              </div>
              {errors.cardNumber && <span className="error">{errors.cardNumber}</span>}
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <label>Expiry Date</label>
                <div className="input-with-icon">
                  <FaCalendarAlt className="input-icon" />
                  <input
                    type="text"
                    value={expiryDate}
                    onChange={handleExpiryChange}
                    placeholder="MM/YY"
                    className={errors.expiryDate ? 'input-error' : ''}
                  />
                </div>
                {errors.expiryDate && <span className="error">{errors.expiryDate}</span>}
              </div>
              
              <div className="form-group">
                <label>{cardType === 'Amex' ? 'CID' : 'CVV'}</label>
                <div className="input-with-icon">
                  <FaUserShield className="input-icon" />
                  <input
                    type="text"
                    value={cvv}
                    onChange={handleCvvChange}
                    onFocus={handleCvvFocus}
                    onBlur={handleCvvBlur}
                    placeholder={cardType === 'Amex' ? '1234' : '123'}
                    className={errors.cvv ? 'input-error' : ''}
                  />
                </div>
                {errors.cvv && <span className="error">{errors.cvv}</span>}
              </div>
            </div>
            
            <div className="form-group">
              <label>Card Type</label>
              <select
                value={cardType}
                onChange={(e) => setCardType(e.target.value)}
                className={errors.cardType ? 'input-error' : ''}
              >
                <option value="">Select Card Type</option>
                <option value="Visa">Visa</option>
                <option value="MasterCard">MasterCard</option>
                <option value="Amex">American Express</option>
                <option value="Discover">Discover</option>
              </select>
              {errors.cardType && <span className="error">{errors.cardType}</span>}
            </div>
            
            <div className="amount-due">
              <h3>Amount Due</h3>
              <p className="total-amount">LKR {parseFloat(totalCost).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</p>
            </div>
            
            <button type="submit" className="pay-now-button" disabled={isProcessing}>
              {isProcessing ? (
                <>
                  <span className="loading-spinner"></span>
                  Processing...
                </>
              ) : (
                <>
                  <FaLock /> Confirm Payment
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default PaymentGateway;