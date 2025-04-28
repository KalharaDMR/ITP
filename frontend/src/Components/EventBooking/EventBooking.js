import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaExclamationCircle, FaCheckCircle } from 'react-icons/fa';
import './EventBooking.css';

function EventBooking() {
    const location = useLocation();
    const navigate = useNavigate();
    const { eventType } = location.state || {};

    const [inputs, setInputs] = useState({
        FirstName: '',
        LastName: '',
        Email: '',
        PhoneNumber: '',
        Country: 'Sri Lanka',
        EventType: eventType?.name || '',
        EventDate: '',
        GuestCount: 50,
        SpecialRequests: ''
    });

    const [errors, setErrors] = useState({});
    const [totalCost, setTotalCost] = useState(0);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [serverError, setServerError] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);

    // Price calculation based on event type and guest count
    useEffect(() => {
        if (eventType) {
            let cost = eventType.basePrice;
            
            if (inputs.GuestCount > 100) {
                cost += (inputs.GuestCount - 100) * 2500;
            } else if (inputs.GuestCount > 50) {
                cost += (inputs.GuestCount - 50) * 3000;
            }
            
            setTotalCost(cost);
        }
    }, [inputs.GuestCount, eventType]);

    const validateField = (name, value) => {
        let error = '';
        
        switch (name) {
            case 'FirstName':
            case 'LastName':
                if (!value.trim()) {
                    error = 'This field is required';
                } else if (value.length < 2) {
                    error = 'Must be at least 2 characters';
                } else if (!/^[a-zA-Z\s'-]+$/.test(value)) {
                    error = 'Contains invalid characters';
                }
                break;
            case 'Email':
                if (!value) {
                    error = 'Email is required';
                } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
                    error = 'Invalid email format';
                }
                break;
            case 'PhoneNumber':
                if (!value) {
                    error = 'Phone number is required';
                } else if (!/^\+?\d{10,15}$/.test(value)) {
                    error = 'Invalid phone number (10-15 digits)';
                }
                break;
            case 'EventType':
                if (!value) {
                    error = 'Please select an event type';
                }
                break;
            case 'EventDate':
                if (!value) {
                    error = 'Event date is required';
                } else {
                    const selectedDate = new Date(value);
                    const today = new Date();
                    today.setHours(0, 0, 0, 0);
                    
                    if (selectedDate < today) {
                        error = 'Date cannot be in the past';
                    } else if (selectedDate > new Date(today.getTime() + 365 * 24 * 60 * 60 * 1000)) {
                        error = 'Date cannot be more than 1 year in advance';
                    }
                }
                break;
            case 'GuestCount':
                if (value < 10) {
                    error = 'Minimum 10 guests required';
                } else if (value > 500) {
                    error = 'Maximum 500 guests allowed';
                }
                break;
            default:
                break;
        }
        
        return error;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        
        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(prev => {
                const newErrors = {...prev};
                delete newErrors[name];
                return newErrors;
            });
        }

        // Special handling for number inputs
        if (name === 'GuestCount') {
            const numValue = parseInt(value) || 0;
            if (numValue >= 0) {
                setInputs(prev => ({
                    ...prev,
                    [name]: Math.min(numValue, 500) // Enforce max limit
                }));
            }
            return;
        }

        setInputs(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const validateForm = () => {
        const newErrors = {};
        let isValid = true;

        // Validate all fields
        Object.keys(inputs).forEach(key => {
            if (key !== 'SpecialRequests' && key !== 'Country') {
                const error = validateField(key, inputs[key]);
                if (error) {
                    newErrors[key] = error;
                    isValid = false;
                }
            }
        });

        setErrors(newErrors);
        return isValid;
    };

    const handleBlur = (e) => {
        const { name, value } = e.target;
        const error = validateField(name, value);
        
        if (error) {
            setErrors(prev => ({
                ...prev,
                [name]: error
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setServerError(null);
        
        if (!validateForm()) {
            // Add shake animation to indicate errors
            const form = document.querySelector('.event-booking-form');
            form.classList.add('shake-animation');
            setTimeout(() => form.classList.remove('shake-animation'), 500);
            return;
        }

        setIsSubmitting(true);

        try {
            const response = await axios.post('http://localhost:5000/events', {
                ...inputs,
                EventDate: new Date(inputs.EventDate),
                TotalCost: totalCost
            });

            if (response.data.event) {
                setSuccessMessage('Booking successful! Redirecting...');
                
                // Add success animation class before navigation
                document.querySelector('.event-booking-container').classList.add('submit-success');
                
                setTimeout(() => {
                    navigate('/eventpayment', {
                        state: {
                            ...inputs,
                            totalCost,
                            eventId: response.data.event._id
                        }
                    });
                }, 1500);
            }
        } catch (error) {
            console.error('Error booking event:', error);
            
            let errorMessage = 'Failed to book event. Please try again.';
            if (error.response) {
                if (error.response.status === 400) {
                    errorMessage = error.response.data.message || 'Invalid data submitted';
                } else if (error.response.status === 500) {
                    errorMessage = 'Server error. Please try again later.';
                }
            }
            
            setServerError(errorMessage);
            
            // Add error shake animation
            const form = document.querySelector('.event-booking-form');
            form.classList.add('shake-animation');
            setTimeout(() => form.classList.remove('shake-animation'), 500);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="event-booking-container">
            <h1>Event Booking</h1>
            
            {serverError && (
                <div className="server-error">
                    <FaExclamationCircle /> {serverError}
                </div>
            )}
            
            {successMessage && (
                <div className="success-message">
                    <FaCheckCircle /> {successMessage}
                </div>
            )}

            <form onSubmit={handleSubmit} className="event-booking-form">
                <div className="form-row">
                    <div className="form-group">
                        <label>First Name *</label>
                        <input 
                            type="text" 
                            name="FirstName" 
                            value={inputs.FirstName} 
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className={errors.FirstName ? 'error-input' : ''}
                            placeholder="Enter your first name"
                        />
                        {errors.FirstName && (
                            <span className="error-message">
                                <FaExclamationCircle /> {errors.FirstName}
                            </span>
                        )}
                    </div>
                    <div className="form-group">
                        <label>Last Name *</label>
                        <input 
                            type="text" 
                            name="LastName" 
                            value={inputs.LastName} 
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className={errors.LastName ? 'error-input' : ''}
                            placeholder="Enter your last name"
                        />
                        {errors.LastName && (
                            <span className="error-message">
                                <FaExclamationCircle /> {errors.LastName}
                            </span>
                        )}
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
                            onBlur={handleBlur}
                            className={errors.Email ? 'error-input' : ''}
                            placeholder="your@email.com"
                        />
                        {errors.Email && (
                            <span className="error-message">
                                <FaExclamationCircle /> {errors.Email}
                            </span>
                        )}
                    </div>
                    <div className="form-group">
                        <label>Phone Number *</label>
                        <input 
                            type="tel" 
                            name="PhoneNumber" 
                            value={inputs.PhoneNumber} 
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className={errors.PhoneNumber ? 'error-input' : ''}
                            placeholder="+94 XX XXX XXXX"
                        />
                        {errors.PhoneNumber && (
                            <span className="error-message">
                                <FaExclamationCircle /> {errors.PhoneNumber}
                            </span>
                        )}
                    </div>
                </div>

                <div className="form-group">
                    <label>Country *</label>
                    <select 
                        name="Country" 
                        value={inputs.Country} 
                        onChange={handleChange}
                        className={errors.Country ? 'error-input' : ''}
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
                            onBlur={handleBlur}
                            className={errors.EventType ? 'error-input' : ''}
                        >
                            <option value="">Select Event Type</option>
                            <option value="Wedding">Wedding</option>
                            <option value="Conference">Conference</option>
                            <option value="Birthday Party">Birthday Party</option>
                            <option value="Corporate Retreat">Corporate Retreat</option>
                            <option value="Other">Other</option>
                        </select>
                        {errors.EventType && (
                            <span className="error-message">
                                <FaExclamationCircle /> {errors.EventType}
                            </span>
                        )}
                    </div>
                    <div className="form-group">
                        <label>Event Date *</label>
                        <input 
                            type="date" 
                            name="EventDate" 
                            value={inputs.EventDate} 
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className={errors.EventDate ? 'error-input' : ''}
                            min={new Date().toISOString().split('T')[0]}
                        />
                        {errors.EventDate && (
                            <span className="error-message">
                                <FaExclamationCircle /> {errors.EventDate}
                            </span>
                        )}
                    </div>
                </div>

                <div className="form-group">
                    <label>Number of Guests *</label>
                    <input 
                        type="number" 
                        name="GuestCount" 
                        value={inputs.GuestCount} 
                        onChange={handleChange}
                        onBlur={handleBlur}
                        min="10" 
                        max="500" 
                        className={errors.GuestCount ? 'error-input' : ''}
                    />
                    <div className="guest-count-display">
                        <span>{inputs.GuestCount} guests</span>
                        {errors.GuestCount && (
                            <span className="error-message">
                                <FaExclamationCircle /> {errors.GuestCount}
                            </span>
                        )}
                    </div>
                </div>

                <div className="form-group">
                    <label>Special Requests</label>
                    <textarea 
                        name="SpecialRequests" 
                        value={inputs.SpecialRequests} 
                        onChange={handleChange} 
                        rows="4"
                        placeholder="Any special requirements or notes..."
                    />
                </div>

                <div className="price-summary">
                    <h3>Price Summary</h3>
                    <p>Base Price: LKR {eventType?.basePrice.toLocaleString() || '0'}</p>
                    {inputs.GuestCount > 50 && (
                        <p>Additional Guests ({inputs.GuestCount - 50}): LKR {((inputs.GuestCount > 100 ? 
                            (50 * 3000 + (inputs.GuestCount - 100) * 2500) : 
                            (inputs.GuestCount - 50) * 3000).toLocaleString())}
                        </p>
                    )}
                    <p className="total">Total: LKR {totalCost.toLocaleString()}</p>
                </div>

                <button 
                    type="submit" 
                    disabled={isSubmitting} 
                    className="submit-btn"
                >
                    {isSubmitting ? (
                        <>
                            <span className="loading-spinner"></span>
                            Processing...
                        </>
                    ) : (
                        'Book Event'
                    )}
                </button>
            </form>
        </div>
    );
}

export default EventBooking;