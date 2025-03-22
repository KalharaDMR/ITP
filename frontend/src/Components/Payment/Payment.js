import React from 'react';
import { useLocation } from 'react-router-dom';
import './Payment.css'; // Import the CSS file for styling

function Payment() {
  const location = useLocation();
  const { FirstName, LastName, SafariType, NoOfAdults, NoOfKids, totalCost } = location.state;

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
      <button className="pay-now-button">Pay Now</button>
    </div>
  );
}

export default Payment;