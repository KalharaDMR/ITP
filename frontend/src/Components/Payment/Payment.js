// Payment.js
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './Payment.css';

function Payment() {
  const location = useLocation();
  const navigate = useNavigate();
  const { FirstName, LastName, SafariType, NoOfAdults, NoOfKids, totalCost } = location.state;

  const handlePayNow = () => {
    // Pass totalCost to PaymentGateway
    navigate('/paymentgateway', { state: { totalCost } });
  };

  const handleAdminView = () => {
    navigate("/roomdetails");
  };

  return (
    <div className="payment-container">
      <h1 className="payment-title">Payment Details</h1>
      <div className="payment-details">
        <p><strong>Name:</strong> {FirstName} {LastName}</p>
        <p><strong>Safari Type:</strong> {SafariType}</p>
        <p><strong>Number of Adults:</strong> {NoOfAdults}</p>
        <p><strong>Number of Kids:</strong> {NoOfKids}</p>
        <p><strong>Total Cost:</strong> LKR {totalCost}</p>
      </div>
      <button onClick={handlePayNow} className="pay-now-button">Pay Now</button>
      <button onClick={handleAdminView} className="admin-view-button">Admin View</button>
    </div>
  );
}

export default Payment;