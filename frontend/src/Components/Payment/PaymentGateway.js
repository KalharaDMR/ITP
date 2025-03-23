// PaymentGateway.js
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './PaymentGateway.css';

function PaymentGateway() {
  const location = useLocation();
  const navigate = useNavigate();
  const { totalCost } = location.state; // Retrieve totalCost from state

  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [cardType, setCardType] = useState('');
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!cardNumber.match(/^\d{16}$/)) newErrors.cardNumber = 'Invalid card number';
    if (!expiryDate.match(/^(0[1-9]|1[0-2])\/\d{2}$/)) newErrors.expiryDate = 'Invalid expiry date';
    if (!cvv.match(/^\d{3}$/)) newErrors.cvv = 'Invalid CVV';
    if (!cardType) newErrors.cardType = 'Please select a card type';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      // Process payment here
      alert('Payment Successful!');
      navigate('/roomdetails'); // Navigate after successful payment
    }
  };

  return (
    <div className="payment-gateway-container">
      <h2 className="payment-title">Payment Gateway</h2>
      <form onSubmit={handleSubmit} className="payment-form">
        <div className="form-group">
          <label>Card Number</label>
          <div className="card-input-container">
            <input
              type="text"
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
              placeholder="1234 5678 9012 3456"
              className={errors.cardNumber ? 'input-error' : ''}
            />
            <div className="card-icons">
              <i className="fab fa-cc-visa"></i> {/* Visa icon */}
              <i className="fab fa-cc-mastercard"></i> {/* MasterCard icon */}
            </div>
          </div>
          {errors.cardNumber && <span className="error">{errors.cardNumber}</span>}
        </div>
        <div className="form-group">
          <label>Expiry Date</label>
          <input
            type="text"
            value={expiryDate}
            onChange={(e) => setExpiryDate(e.target.value)}
            placeholder="MM/YY"
            className={errors.expiryDate ? 'input-error' : ''}
          />
          {errors.expiryDate && <span className="error">{errors.expiryDate}</span>}
        </div>
        <div className="form-group">
          <label>CVV</label>
          <input
            type="text"
            value={cvv}
            onChange={(e) => setCvv(e.target.value)}
            placeholder="123"
            className={errors.cvv ? 'input-error' : ''}
          />
          {errors.cvv && <span className="error">{errors.cvv}</span>}
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
        <div className="form-group">
          <label>Total Amount</label>
          <input
            type="text"
            value={`LKR ${totalCost}`}
            disabled
            className="total-amount"
          />
        </div>
        <button type="submit" className="pay-now-button">Pay Now</button>
      </form>
    </div>
  );
}

export default PaymentGateway;