import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './EventPayment.css';

function EventPayment() {
    const location = useLocation();
    const navigate = useNavigate();
    const { 
        FirstName, 
        LastName, 
        Email, 
        EventType, 
        EventDate, 
        GuestCount, 
        totalCost,
        eventId
    } = location.state;

    const handlePayment = () => {
        navigate('/paymentgateway', { 
            state: { 
                FirstName, 
                LastName, 
                EventType, 
                totalCost,
                type: 'event',
                referenceId: eventId
            } 
        });
    };

    const handleEdit = () => {
        navigate('/eventbooking', { state: location.state });
    };

    return (
        <div className="event-payment-container">
            <h1>Event Booking Summary</h1>
            <div className="event-details">
                <h2>Event Details</h2>
                <p><strong>Name:</strong> {FirstName} {LastName}</p>
                <p><strong>Email:</strong> {Email}</p>
                <p><strong>Event Type:</strong> {EventType}</p>
                <p><strong>Event Date:</strong> {new Date(EventDate).toLocaleDateString()}</p>
                <p><strong>Number of Guests:</strong> {GuestCount}</p>
                <p><strong>Total Cost:</strong> LKR {totalCost.toLocaleString()}</p>
            </div>
            <div className="payment-actions">
                <button onClick={handlePayment} className="pay-now-btn">Proceed to Payment</button>
                <button onClick={handleEdit} className="edit-btn">Edit Booking</button>
            </div>
        </div>
    );
}

export default EventPayment;