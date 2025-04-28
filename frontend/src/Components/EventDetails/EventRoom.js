import React from 'react';
import './EventRoom.css';
import { useNavigate } from 'react-router-dom';

function EventRoom({ event, onDelete }) {
  const {
    _id = "",
    FirstName = "",
    LastName = "",
    PhoneNumber = "",
    Email = "",
    Country = "",
    EventType = "",
    EventDate = "",
    GuestCount = 0,
    SpecialRequests = "",
    TotalCost = 0
  } = event;

  const navigate = useNavigate();

  const handleDelete = () => {
    if (onDelete) {
      onDelete(_id);
    }
  };

  const handleUpdate = () => {
    navigate(`/update-event/${_id}`);
  };

  return (
    <div className="event-room-container">
      <h2>Event Booking Details</h2>
      <div className="event-details">
        <div className="detail-row">
          <span className="detail-label">Booking ID:</span>
          <span className="detail-value">{_id}</span>
        </div>
        <div className="detail-row">
          <span className="detail-label">Name:</span>
          <span className="detail-value">{FirstName} {LastName}</span>
        </div>
        <div className="detail-row">
          <span className="detail-label">Contact:</span>
          <span className="detail-value">{PhoneNumber}</span>
        </div>
        <div className="detail-row">
          <span className="detail-label">Email:</span>
          <span className="detail-value">{Email}</span>
        </div>
        <div className="detail-row">
          <span className="detail-label">Country:</span>
          <span className="detail-value">{Country}</span>
        </div>
        <div className="detail-row">
          <span className="detail-label">Event Type:</span>
          <span className="detail-value">{EventType}</span>
        </div>
        <div className="detail-row">
          <span className="detail-label">Event Date:</span>
          <span className="detail-value">
            {new Date(EventDate).toLocaleDateString()}
          </span>
        </div>
        <div className="detail-row">
          <span className="detail-label">Guests:</span>
          <span className="detail-value">{GuestCount}</span>
        </div>
        {SpecialRequests && (
          <div className="detail-row">
            <span className="detail-label">Special Requests:</span>
            <span className="detail-value">{SpecialRequests}</span>
          </div>
        )}
        <div className="detail-row total-cost">
          <span className="detail-label">Total Cost:</span>
          <span className="detail-value">LKR {Number(TotalCost).toLocaleString()}</span>
        </div>
      </div>
      <div className="event-actions">
        <button onClick={handleUpdate} className="update-button">
          Update
        </button>
        <button onClick={handleDelete} className="delete-button">
          Delete
        </button>
      </div>
    </div>
  );
}

export default EventRoom;