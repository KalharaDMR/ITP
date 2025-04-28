import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { FaArrowLeft, FaCalendarAlt, FaUserAlt, FaChild, FaMoneyBillWave, FaLock, FaExclamationCircle } from 'react-icons/fa';
import './AddRoom.css';

function AddRoom() {
  const navigate = useNavigate();
  const location = useLocation();
  const { safari, userData } = location.state || {};

  const [inputs, setInputs] = useState({
    FirstName: userData?.FirstName || "",
    LastName: userData?.LastName || "",
    ContactNumber: "",
    Email: "",
    BookingDate: "",
    Schedule: safari?.name || "",
    NoOfAdults: userData?.NoOfAdults || 0,
    NoOfKids: userData?.NoOfKids || 0,
    Nationality: "",
  });

  const [errors, setErrors] = useState({});
  const [totalCost, setTotalCost] = useState(0);
  const [adultPrice, setAdultPrice] = useState(safari ? safari.pricePerPerson : 0);
  const [kidPrice, setKidPrice] = useState(safari ? safari.pricePerPerson * 0.5 : 0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [serverError, setServerError] = useState(null);

  const priceMapping = {
    "Block 1 (Palatupana) - Half-day (Morning)": { adult: 3500, kid: 1500 },
    "Block 1 (Palatupana) - Half-day (Afternoon)": { adult: 3500, kid: 1500 },
    "Block 1 (Palatupana) - Full-day": { adult: 6000, kid: 3000 },
    "Block 1 (Katagamuwa) - Half-day (Morning)": { adult: 2500, kid: 800 },
    "Block 1 (Katagamuwa) - Half-day (Afternoon)": { adult: 2500, kid: 800 },
    "Block 1 (Katagamuwa) - Full-day": { adult: 4800, kid: 1600 },
    "Blocks 4&5 (Galge) - Half-day (Morning)": { adult: 5500, kid: 3800 },
    "Blocks 4&5 (Galge) - Half-day (Afternoon)": { adult: 5500, kid: 3800 },
    "Blocks 4&5 (Galge) - Full-day": { adult: 7300, kid: 4000 },
    "Yala National Park - Full-day": { adult: 4200, kid: 2600 },
    "Udawalawe National Park - Half-day (Morning)": { adult: 1800, kid: 600 },
    "Wilpattu National Park - Full-day": { adult: 3700, kid: 2200 },
    "Minneriya National Park - Half-day (Morning)": { adult: 6500, kid: 4200 },
    "Maduru Oya National Park - Half-day (Afternoon)": { adult: 7300, kid: 5000 },
  };

  useEffect(() => {
    const selectedSchedule = inputs.Schedule;
    const adultPrice = priceMapping[selectedSchedule]?.adult || 0;
    const kidPrice = priceMapping[selectedSchedule]?.kid || 0;

    setAdultPrice(adultPrice);
    setKidPrice(kidPrice);

    const adultCost = adultPrice * inputs.NoOfAdults;
    const kidCost = kidPrice * inputs.NoOfKids;
    const total = adultCost + kidCost;

    setTotalCost(total.toFixed(2));
  }, [inputs.Schedule, inputs.NoOfAdults, inputs.NoOfKids]);

  const validateForm = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\+?\d{10,15}$/;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const selectedDate = new Date(inputs.BookingDate);

    // First Name validation
    if (!inputs.FirstName.trim()) {
      newErrors.FirstName = "First name is required";
    } else if (inputs.FirstName.length < 2) {
      newErrors.FirstName = "First name must be at least 2 characters";
    } else if (!/^[a-zA-Z\s'-]+$/.test(inputs.FirstName)) {
      newErrors.FirstName = "First name contains invalid characters";
    }

    // Last Name validation
    if (!inputs.LastName.trim()) {
      newErrors.LastName = "Last name is required";
    } else if (inputs.LastName.length < 2) {
      newErrors.LastName = "Last name must be at least 2 characters";
    } else if (!/^[a-zA-Z\s'-]+$/.test(inputs.LastName)) {
      newErrors.LastName = "Last name contains invalid characters";
    }

    // Contact Number validation
    if (!inputs.ContactNumber) {
      newErrors.ContactNumber = "Contact number is required";
    } else if (!phoneRegex.test(inputs.ContactNumber)) {
      newErrors.ContactNumber = "Please enter a valid phone number (10-15 digits)";
    }

    // Email validation
    if (!inputs.Email) {
      newErrors.Email = "Email is required";
    } else if (!emailRegex.test(inputs.Email)) {
      newErrors.Email = "Please enter a valid email address";
    }

    // Booking Date validation
    if (!inputs.BookingDate) {
      newErrors.BookingDate = "Booking date is required";
    } else if (selectedDate < today) {
      newErrors.BookingDate = "Booking date cannot be in the past";
    } else if (selectedDate > new Date(today.getTime() + 365 * 24 * 60 * 60 * 1000)) {
      newErrors.BookingDate = "Booking date cannot be more than 1 year in advance";
    }

    // Nationality validation
    if (!inputs.Nationality) {
      newErrors.Nationality = "Please select your nationality";
    }

    // Schedule validation
    if (!inputs.Schedule) {
      newErrors.Schedule = "Please select a safari schedule";
    }

    // Number of Adults validation
    if (inputs.NoOfAdults < 0) {
      newErrors.NoOfAdults = "Number of adults cannot be negative";
    } else if (inputs.NoOfAdults === 0 && inputs.NoOfKids === 0) {
      newErrors.NoOfAdults = "At least one adult or child is required";
      newErrors.NoOfKids = "At least one adult or child is required";
    } else if (inputs.NoOfAdults > 10) {
      newErrors.NoOfAdults = "Maximum 10 adults allowed per booking";
    }

    // Number of Kids validation
    if (inputs.NoOfKids < 0) {
      newErrors.NoOfKids = "Number of kids cannot be negative";
    } else if (inputs.NoOfKids > 10) {
      newErrors.NoOfKids = "Maximum 10 kids allowed per booking";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
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

    setInputs((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleNumberChange = (e) => {
    const { name, value } = e.target;
    const numValue = parseInt(value) || 0;
    
    if (numValue >= 0) {
      setInputs((prevState) => ({
        ...prevState,
        [name]: numValue,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError(null);
    
    if (!validateForm()) {
      // Add shake animation to indicate errors
      const form = document.querySelector('.booking-form');
      form.classList.add('shake-animation');
      setTimeout(() => form.classList.remove('shake-animation'), 500);
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await axios.post("http://localhost:5000/users", {
        ...inputs,
        SafariType: inputs.Schedule,
        BookingDate: new Date(inputs.BookingDate),
        TotalCost: totalCost
      });

      // Add success animation
      document.querySelector('.booking-form').classList.add('submit-success');
      
      setTimeout(() => {
        navigate('/payment', {
          state: {
            FirstName: inputs.FirstName,
            LastName: inputs.LastName,
            SafariType: inputs.Schedule,
            NoOfAdults: inputs.NoOfAdults,
            NoOfKids: inputs.NoOfKids,
            totalCost: totalCost,
            bookingId: response.data._id // Assuming your backend returns the created booking ID
          },
        });
      }, 1000);
    } catch (error) {
      console.error("Submission error:", error);
      
      let errorMessage = "Failed to process booking. Please try again.";
      if (error.response) {
        if (error.response.status === 400) {
          errorMessage = error.response.data.message || "Invalid data submitted";
        } else if (error.response.status === 500) {
          errorMessage = "Server error. Please try again later.";
        }
      }
      
      setServerError(errorMessage);
      
      // Add error animation
      const form = document.querySelector('.booking-form');
      form.classList.add('shake-animation');
      setTimeout(() => form.classList.remove('shake-animation'), 500);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="add-room-container">
      {/* Navigation Bar from Home.js */}
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

      <div className="booking-wrapper">
        <button className="back-button" onClick={() => navigate(-1)}>
          <FaArrowLeft /> Back
        </button>

        <h1 className="form-title">Safari Booking</h1>
        
        {serverError && (
          <div className="server-error">
            <FaExclamationCircle /> {serverError}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="booking-form">
          <div className="form-grid">
            <div className="form-group">
              <label>First Name</label>
              <div className="input-with-icon">
                <FaUserAlt className="input-icon" />
                <input 
                  type="text" 
                  name="FirstName" 
                  value={inputs.FirstName} 
                  onChange={handleChange} 
                  placeholder="Enter first name"
                  className={errors.FirstName ? 'error-input' : ''}
                />
              </div>
              {errors.FirstName && <span className="error-message"><FaExclamationCircle /> {errors.FirstName}</span>}
            </div>

            <div className="form-group">
              <label>Last Name</label>
              <div className="input-with-icon">
                <FaUserAlt className="input-icon" />
                <input 
                  type="text" 
                  name="LastName" 
                  value={inputs.LastName} 
                  onChange={handleChange} 
                  placeholder="Enter last name"
                  className={errors.LastName ? 'error-input' : ''}
                />
              </div>
              {errors.LastName && <span className="error-message"><FaExclamationCircle /> {errors.LastName}</span>}
            </div>

            <div className="form-group">
              <label>Contact Number</label>
              <div className="input-with-icon">
                <input 
                  type="text" 
                  name="ContactNumber" 
                  value={inputs.ContactNumber} 
                  onChange={handleChange} 
                  placeholder="+94 XX XXX XXXX"
                  className={errors.ContactNumber ? 'error-input' : ''}
                />
              </div>
              {errors.ContactNumber && <span className="error-message"><FaExclamationCircle /> {errors.ContactNumber}</span>}
            </div>

            <div className="form-group">
              <label>Email</label>
              <div className="input-with-icon">
                <input 
                  type="email" 
                  name="Email" 
                  value={inputs.Email} 
                  onChange={handleChange} 
                  placeholder="your@email.com"
                  className={errors.Email ? 'error-input' : ''}
                />
              </div>
              {errors.Email && <span className="error-message"><FaExclamationCircle /> {errors.Email}</span>}
            </div>

            <div className="form-group">
              <label>Booking Date</label>
              <div className="input-with-icon">
                <FaCalendarAlt className="input-icon" />
                <input 
                  type="date" 
                  name="BookingDate" 
                  value={inputs.BookingDate} 
                  onChange={handleChange} 
                  className={errors.BookingDate ? 'error-input' : ''}
                />
              </div>
              {errors.BookingDate && <span className="error-message"><FaExclamationCircle /> {errors.BookingDate}</span>}
            </div>

            <div className="form-group">
              <label>Nationality</label>
              <select 
                name="Nationality" 
                value={inputs.Nationality} 
                onChange={handleChange} 
                className={errors.Nationality ? 'error-input' : ''}
              >
                <option value="">Select Nationality</option>
                <option value="SRI LANKAN">SRI LANKAN</option>
                <option value="FOREIGN">FOREIGN</option>
              </select>
              {errors.Nationality && <span className="error-message"><FaExclamationCircle /> {errors.Nationality}</span>}
            </div>

            <div className="form-group full-width">
              <label>Schedule</label>
              <select 
                name="Schedule" 
                value={inputs.Schedule} 
                onChange={handleChange} 
                className={errors.Schedule ? 'error-input' : ''}
              >
                <option value="">Select Schedule</option>
                <optgroup label="Block 1 (Palatupana)">
                  <option value="Block 1 (Palatupana) - Half-day (Morning)">Half-day (Morning)</option>
                  <option value="Block 1 (Palatupana) - Half-day (Afternoon)">Half-day (Afternoon)</option>
                  <option value="Block 1 (Palatupana) - Full-day">Full-day</option>
                </optgroup>
                <optgroup label="Block 1 (Katagamuwa)">
                  <option value="Block 1 (Katagamuwa) - Half-day (Morning)">Half-day (Morning)</option>
                  <option value="Block 1 (Katagamuwa) - Half-day (Afternoon)">Half-day (Afternoon)</option>
                  <option value="Block 1 (Katagamuwa) - Full-day">Full-day</option>
                </optgroup>
                <optgroup label="Blocks 4&5 (Galge)">
                  <option value="Blocks 4&5 (Galge) - Half-day (Morning)">Half-day (Morning)</option>
                  <option value="Blocks 4&5 (Galge) - Half-day (Afternoon)">Half-day (Afternoon)</option>
                  <option value="Blocks 4&5 (Galge) - Full-day">Full-day</option>
                </optgroup>
                <optgroup label="Additional Safari Destinations">
                  <option value="Yala National Park - Full-day">Yala National Park - Full-day</option>
                  <option value="Udawalawe National Park - Half-day (Morning)">Udawalawe National Park - Half-day (Morning)</option>
                  <option value="Wilpattu National Park - Full-day">Wilpattu National Park - Full-day</option>
                  <option value="Minneriya National Park - Half-day (Morning)">Minneriya National Park - Half-day (Morning)</option>
                  <option value="Maduru Oya National Park - Half-day (Afternoon)">Maduru Oya National Park - Half-day (Afternoon)</option>
                </optgroup>
              </select>
              {errors.Schedule && <span className="error-message"><FaExclamationCircle /> {errors.Schedule}</span>}
            </div>

            <div className="form-group">
              <label>Number of Adults</label>
              <div className="input-with-icon">
                <FaUserAlt className="input-icon" />
                <input 
                  type="number" 
                  name="NoOfAdults" 
                  value={inputs.NoOfAdults} 
                  onChange={handleNumberChange} 
                  min="0"
                  max="10"
                  className={errors.NoOfAdults ? 'error-input' : ''}
                />
              </div>
              {errors.NoOfAdults && <span className="error-message"><FaExclamationCircle /> {errors.NoOfAdults}</span>}
            </div>

            <div className="form-group">
              <label>Number of Kids</label>
              <div className="input-with-icon">
                <FaChild className="input-icon" />
                <input 
                  type="number" 
                  name="NoOfKids" 
                  value={inputs.NoOfKids} 
                  onChange={handleNumberChange} 
                  min="0"
                  max="10"
                  className={errors.NoOfKids ? 'error-input' : ''}
                />
              </div>
              {errors.NoOfKids && <span className="error-message"><FaExclamationCircle /> {errors.NoOfKids}</span>}
            </div>
          </div>

          <button type="submit" className="submit-button" disabled={isSubmitting}>
            {isSubmitting ? (
              <span className="loading-spinner"></span>
            ) : (
              <>
                <FaLock /> Secure Booking
              </>
            )}
            {isSubmitting ? 'Processing...' : 'Book Now'}
          </button>
        </form>

        <div className="total-cost-box">
          <div className="cost-header">
            <FaMoneyBillWave className="cost-icon" />
            <h3>Price Summary</h3>
          </div>
          <div className="cost-details">
            <div className="cost-row">
              <span>1 Adult</span>
              <span>LKR {adultPrice.toLocaleString()}</span>
            </div>
            <div className="cost-row">
              <span>1 Kid</span>
              <span>LKR {kidPrice.toLocaleString()}</span>
            </div>
            <div className="cost-divider"></div>
            <div className="cost-total">
              <span>Total</span>
              <span>LKR {totalCost.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddRoom;