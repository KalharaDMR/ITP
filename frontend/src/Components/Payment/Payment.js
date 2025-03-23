// Payment.js
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './Payment.css';

function Payment() {
  const location = useLocation();
  const navigate = useNavigate();
  const { FirstName, LastName, SafariType, NoOfAdults, NoOfKids, totalCost } = location.state;

  const handlePayNow = () => {
    // Pass ALL details to PaymentGateway
    navigate('/paymentgateway', {
      state: { FirstName, LastName, SafariType, NoOfAdults, NoOfKids, totalCost },
    });
  };

  const handleEdit = () => {
    // Navigate to AddRoom with previous data
    navigate('/addroom', {
      state: {
        safari: {
          name: SafariType, // Map SafariType to Schedule in AddRoom
          pricePerPerson: totalCost / (NoOfAdults + NoOfKids * 0.5), // Calculate price per person
        },
        userData: {
          FirstName,
          LastName,
          NoOfAdults,
          NoOfKids,
        },
      },
    });
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
      <button onClick={handleEdit} className="edit-button">Edit</button> {/* Add Edit Button */}
    </div>
  );
}

export default Payment;