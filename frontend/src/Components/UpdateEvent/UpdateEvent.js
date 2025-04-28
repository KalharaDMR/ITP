import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import './UpdateEvent.css';

function UpdateEvent() {
  const [inputs, setInputs] = useState({
    FirstName: '',
    LastName: '',
    Email: '',
    PhoneNumber: '',
    Country: 'Sri Lanka',
    EventType: '',
    EventDate: '',
    GuestCount: 50,
    SpecialRequests: '',
    TotalCost: 0
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverError, setServerError] = useState(null);
  
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/events/${id}`);
        const eventData = response.data.event;
        
        // Format date for input field
        const eventDate = new Date(eventData.EventDate);
        const formattedDate = eventDate.toISOString().split('T')[0];
        
        setInputs({
          ...eventData,
          EventDate: formattedDate
        });
      } catch (error) {
        console.error("Error fetching event:", error);
      }
    };
    fetchEvent();
  }, [id]);

  const validateForm = () => {
    const newErrors = {};
    if (!inputs.FirstName.trim()) newErrors.FirstName = "First name is required";
    if (!inputs.LastName.trim()) newErrors.LastName = "Last name is required";
    if (!inputs.Email) newErrors.Email = "Email is required";
    if (!inputs.PhoneNumber) newErrors.PhoneNumber = "Phone number is required";
    if (!inputs.EventType) newErrors.EventType = "Event type is required";
    if (!inputs.EventDate) newErrors.EventDate = "Event date is required";
    if (inputs.GuestCount < 10) newErrors.GuestCount = "Minimum 10 guests required";
    if (inputs.GuestCount > 500) newErrors.GuestCount = "Maximum 500 guests allowed";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }

    if (name === 'GuestCount') {
      const numValue = parseInt(value) || 0;
      setInputs(prev => ({
        ...prev,
        [name]: Math.min(Math.max(numValue, 10), 500)
      }));
      return;
    }

    setInputs(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError(null);
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      await axios.put(`http://localhost:5000/events/${id}`, {
        ...inputs,
        EventDate: new Date(inputs.EventDate)
      });
      
      alert("Event updated successfully!");
      navigate('/eventdetails');
    } catch (error) {
      console.error("Error updating event:", error);
      setServerError("Failed to update event. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="update-event-container">
      <h1>Update Event Booking</h1>
      
      {serverError && (
        <div className="server-error">
          {serverError}
        </div>
      )}

      <form onSubmit={handleSubmit} className="event-form">
        <div className="form-row">
          <div className="form-group">
            <label>First Name *</label>
            <input
              type="text"
              name="FirstName"
              value={inputs.FirstName}
              onChange={handleChange}
              className={errors.FirstName ? 'error-input' : ''}
            />
            {errors.FirstName && <span className="error-message">{errors.FirstName}</span>}
          </div>
          <div className="form-group">
            <label>Last Name *</label>
            <input
              type="text"
              name="LastName"
              value={inputs.LastName}
              onChange={handleChange}
              className={errors.LastName ? 'error-input' : ''}
            />
            {errors.LastName && <span className="error-message">{errors.LastName}</span>}
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Email *</label>
            <input
              type="email"
              name="Email"
              value={inputs.Email}
              onChange={handleChange}
              className={errors.Email ? 'error-input' : ''}
            />
            {errors.Email && <span className="error-message">{errors.Email}</span>}
          </div>
          <div className="form-group">
            <label>Phone Number *</label>
            <input
              type="tel"
              name="PhoneNumber"
              value={inputs.PhoneNumber}
              onChange={handleChange}
              className={errors.PhoneNumber ? 'error-input' : ''}
            />
            {errors.PhoneNumber && <span className="error-message">{errors.PhoneNumber}</span>}
          </div>
        </div>

        <div className="form-group">
          <label>Country *</label>
          <select
            name="Country"
            value={inputs.Country}
            onChange={handleChange}
          >
            <option value="Sri Lanka">Sri Lanka</option>
            <option value="India">India</option>
            <option value="United States">United States</option>
            <option value="United Kingdom">United Kingdom</option>
            <option value="Australia">Australia</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Event Type *</label>
            <select
              name="EventType"
              value={inputs.EventType}
              onChange={handleChange}
              className={errors.EventType ? 'error-input' : ''}
            >
              <option value="">Select Event Type</option>
              <option value="Wedding">Wedding</option>
              <option value="Conference">Conference</option>
              <option value="Birthday Party">Birthday Party</option>
              <option value="Corporate Retreat">Corporate Retreat</option>
              <option value="Other">Other</option>
            </select>
            {errors.EventType && <span className="error-message">{errors.EventType}</span>}
          </div>
          <div className="form-group">
            <label>Event Date *</label>
            <input
              type="date"
              name="EventDate"
              value={inputs.EventDate}
              onChange={handleChange}
              className={errors.EventDate ? 'error-input' : ''}
              min={new Date().toISOString().split('T')[0]}
            />
            {errors.EventDate && <span className="error-message">{errors.EventDate}</span>}
          </div>
        </div>

        <div className="form-group">
          <label>Number of Guests *</label>
          <input
            type="number"
            name="GuestCount"
            value={inputs.GuestCount}
            onChange={handleChange}
            min="10"
            max="500"
            className={errors.GuestCount ? 'error-input' : ''}
          />
          {errors.GuestCount && <span className="error-message">{errors.GuestCount}</span>}
        </div>

        <div className="form-group">
          <label>Special Requests</label>
          <textarea
            name="SpecialRequests"
            value={inputs.SpecialRequests}
            onChange={handleChange}
            rows="4"
          />
        </div>

        <div className="price-summary">
          <h3>Price Summary</h3>
          <p>Total: LKR {Number(inputs.TotalCost).toLocaleString()}</p>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="submit-button"
        >
          {isSubmitting ? 'Updating...' : 'Update Booking'}
        </button>
      </form>
    </div>
  );
}

export default UpdateEvent;