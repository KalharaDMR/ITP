/*import React, { useState } from 'react';
import Nav from '../Nav/Nav';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function AddRoom() {
    const navigate = useNavigate(); 

    const [inputs, setInputs] = useState({
        FirstName: "",
        LastName: "",
        Email: "",
        RoomType: "",
        ArrivalDateandTime: "",
        DepartureDate: "",
        FreePickup: false, // Boolean
        SpecialRequests: ""
    });

    // Handle input change
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setInputs((prevState) => ({
            ...prevState,
            [name]: type === "checkbox" ? checked : value
        }));
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Form Data:", inputs);
        alert("Room added successfully!");
        sendRequest().then(()=>history('roomdetails'))
    };

    const sendRequest = async()=>{
        await axios.post("http://localhost:5000/users",{
        FirstName: String (inputs.FirstNameName),
        LastName: String (inputs.LastName),
        Email: String (inputs.Email),
        RoomType: String (inputs.RoomType),
        ArrivalDateandTime: Date (inputs.ArrivalDateandTime),
        DepartureDate: Date (inputs.DepartureDate),
        FreePickup: String (inputs.FreePickup),
        SpecialRequests: String (inputs.SpecialRequests),
        }).then (res => res.data);
          
    }

    return (
        <div>
            <Nav />  
            <h1>Add Room</h1> 
            
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", maxWidth: "400px", margin: "auto" }}>
                <label>First Name:</label>
                <input type="text" name="FirstName" value={inputs.FirstName} onChange={handleChange} required />

                <label>Last Name:</label>
                <input type="text" name="LastName" value={inputs.LastName} onChange={handleChange} required />

                <label>Email:</label>
                <input type="email" name="Email" value={inputs.Email} onChange={handleChange} required />

                <label>Room Type:</label>
                <select name="RoomType" value={inputs.RoomType} onChange={handleChange} required>
                    <option value="">Select Room Type</option>
                    <option value="Single">Single</option>
                    <option value="Double">Double</option>
                    <option value="Suite">Suite</option>
                </select>

                <label>Arrival Date & Time:</label>
                <input type="datetime-local" name="ArrivalDateandTime" value={inputs.ArrivalDateandTime} onChange={handleChange} required />

                <label>Departure Date:</label>
                <input type="date" name="DepartureDate" value={inputs.DepartureDate} onChange={handleChange} required />

                <label>
                    <input type="checkbox" name="FreePickup" checked={inputs.FreePickup} onChange={handleChange} />
                    Free Pickup
                </label>

                <label>Special Requests:</label>
                <textarea name="SpecialRequests" value={inputs.SpecialRequests} onChange={handleChange}></textarea>

                <button type="submit" style={{ marginTop: "10px", padding: "10px", background: "#007bff", color: "white", border: "none", cursor: "pointer" }}>
                    Add Room
                </button>
            </form>
        </div>
    );
}

export default AddRoom;*/


/*import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function AddRoom() {
    const navigate = useNavigate();

    const [inputs, setInputs] = useState({
        FirstName: "",
        LastName: "",
        ContactNumber: "",
        Email: "",
        BookingDate: "",
        Schedule: "",
        NoOfAdults: false,
        NoOfKids: "",
        Nationality: ""
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setInputs((prevState) => ({
            ...prevState,
            [name]: type === "checkbox" ? checked : value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Form Data:", inputs);
        alert("Safari added successfully!");
        sendRequest().then(() => navigate('/roomdetails'));
    };

    const sendRequest = async () => {
        await axios.post("http://localhost:5000/users", {
            FirstName: String(inputs.FirstName),
            LastName: String(inputs.LastName),
            ContactNumber: String(inputs.ContactNumber),
            Email: String(inputs.Email),
            BookingDate: new Date(inputs.BookingDate),
            Schedule: new Date(inputs.Schedule),
            NoOfAdults: Boolean(inputs.NoOfAdults),
            NoOfKids: String(inputs.NoOfKids),
            Nationality: String(inputs.Nationality),
        }).then(res => res.data);
    };

    return (
        <div>
            <h1>Add Room</h1>
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", maxWidth: "400px", margin: "auto" }}>
                <label>First Name:</label>
                <input type="text" name="FirstName" value={inputs.FirstName} onChange={handleChange} required />

                <label>Last Name:</label>
                <input type="text" name="LastName" value={inputs.LastName} onChange={handleChange} required />

                <label>Email:</label>
                <input type="email" name="Email" value={inputs.Email} onChange={handleChange} required />

                <label>Room Type:</label>
                <select name="RoomType" value={inputs.RoomType} onChange={handleChange} required>
                    <option value="">Select Room Type</option>
                    <option value="Single">Single</option>
                    <option value="Double">Double</option>
                    <option value="Suite">Suite</option>
                </select>

                <label>Arrival Date & Time:</label>
                <input type="datetime-local" name="ArrivalDateandTime" value={inputs.ArrivalDateandTime} onChange={handleChange} required />

                <label>Departure Date:</label>
                <input type="date" name="DepartureDate" value={inputs.DepartureDate} onChange={handleChange} required />

                <label>
                    <input type="checkbox" name="FreePickup" checked={inputs.FreePickup} onChange={handleChange} />
                    Free Pickup
                </label>

                <label>Special Requests:</label>
                <textarea name="SpecialRequests" value={inputs.SpecialRequests} onChange={handleChange}></textarea>

                <button type="submit" style={{ marginTop: "10px", padding: "10px", background: "#007bff", color: "white", border: "none", cursor: "pointer" }}>
                    Add Room
                </button>
            </form>
        </div>
    );
}

export default AddRoom;*/

/*import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './AddRoom.css'; // Import the CSS file for styling

function AddRoom() {
    const navigate = useNavigate();

    const [inputs, setInputs] = useState({
        FirstName: "",
        LastName: "",
        ContactNumber: "",
        Email: "",
        BookingDate: "",
        Schedule: "",
        NoOfAdults: 0,
        NoOfKids: 0,
        Nationality: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setInputs((prevState) => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Form Data:", inputs);
        alert("Booking added successfully!");
        sendRequest().then(() => navigate('/roomdetails'));
    };

    const sendRequest = async () => {
        await axios.post("http://localhost:5000/users", {
            FirstName: String(inputs.FirstName),
            LastName: String(inputs.LastName),
            ContactNumber: String(inputs.ContactNumber),
            Email: String(inputs.Email),
            BookingDate: new Date(inputs.BookingDate),
            Schedule: String(inputs.Schedule),
            NoOfAdults: Number(inputs.NoOfAdults),
            NoOfKids: Number(inputs.NoOfKids),
            Nationality: String(inputs.Nationality),
        }).then(res => res.data);
    };

    return (
        <div className="add-room-container">
            <h1 className="form-title">Add New Safari Booking</h1>
            <form onSubmit={handleSubmit} className="booking-form">
                <div className="form-group">
                    <label>First Name:</label>
                    <input type="text" name="FirstName" value={inputs.FirstName} onChange={handleChange} required />
                </div>

                <div className="form-group">
                    <label>Last Name:</label>
                    <input type="text" name="LastName" value={inputs.LastName} onChange={handleChange} required />
                </div>

                <div className="form-group">
                    <label>Contact Number:</label>
                    <input type="text" name="ContactNumber" value={inputs.ContactNumber} onChange={handleChange} required />
                </div>

                <div className="form-group">
                    <label>Email:</label>
                    <input type="email" name="Email" value={inputs.Email} onChange={handleChange} required />
                </div>

                <div className="form-group">
                    <label>Booking Date:</label>
                    <input type="date" name="BookingDate" value={inputs.BookingDate} onChange={handleChange} required />
                </div>

                <div className="form-group">
                    <label>Nationality:</label>
                    <select name="Nationality" value={inputs.Nationality} onChange={handleChange} required>
                        <option value="">Select Nationality</option>
                        <option value="SRI LANKAN">SRI LANKAN</option>
                        <option value="FOREIGN">FOREIGN</option>
                    </select>
                </div>

                <div className="form-group">
                    <label>Schedule:</label>
                    <select name="Schedule" value={inputs.Schedule} onChange={handleChange} required>
                        <option value="">Select Schedule</option>
                        <optgroup label="Block 1 (Palatupana)">
                            <option value="Block 1 (Palatupana) - Half-day (Morning)">Half-day (Morning) - LKR 16,900 per jeep</option>
                            <option value="Block 1 (Palatupana) - Half-day (Afternoon)">Half-day (Afternoon) - LKR 16,900 per jeep</option>
                            <option value="Block 1 (Palatupana) - Full-day">Full-day - LKR 28,100 per jeep</option>
                        </optgroup>
                        <optgroup label="Block 1 (Katagamuwa)">
                            <option value="Block 1 (Katagamuwa) - Half-day (Morning)">Half-day (Morning) - LKR 16,900 per jeep</option>
                            <option value="Block 1 (Katagamuwa) - Half-day (Afternoon)">Half-day (Afternoon) - LKR 16,900 per jeep</option>
                            <option value="Block 1 (Katagamuwa) - Full-day">Full-day - LKR 28,100 per jeep</option>
                        </optgroup>
                        <optgroup label="Blocks 4&5 (Galge)">
                            <option value="Blocks 4&5 (Galge) - Half-day (Morning)">Half-day (Morning) - LKR 19,800 per jeep</option>
                            <option value="Blocks 4&5 (Galge) - Half-day (Afternoon)">Half-day (Afternoon) - LKR 19,800 per jeep</option>
                            <option value="Blocks 4&5 (Galge) - Full-day">Full-day - LKR 29,700 per jeep</option>
                        </optgroup>
                        <optgroup label="Additional Safari Destinations">
                            <option value="Yala National Park - Full-day">Yala National Park - Full-day - LKR 25,000 per group</option>
                            <option value="Udawalawe National Park - Half-day (Morning)">Udawalawe National Park - Half-day (Morning) - LKR 9,600 per group</option>
                            <option value="Wilpattu National Park - Full-day">Wilpattu National Park - Full-day - LKR 32,000 per person</option>
                            <option value="Kaudulla National Park - Half-day (Afternoon)">Kaudulla National Park - Half-day (Afternoon) - LKR 11,200 per group</option>
                            <option value="Minneriya National Park - Half-day (Morning)">Minneriya National Park - Half-day (Morning) - LKR 12,000 per group</option>
                            <option value="Wasgamuwa National Park - Full-day">Wasgamuwa National Park - Full-day - LKR 37,000 per day</option>
                            <option value="Maduru Oya National Park - Half-day (Afternoon)">Maduru Oya National Park - Half-day (Afternoon) - LKR 37,000 per day</option>
                            <option value="Gal Oya National Park - Full-day">Gal Oya National Park - Full-day - LKR 37,000 per day</option>
                            <option value="Horton Plains National Park - Half-day (Morning)">Horton Plains National Park - Half-day (Morning) - LKR 37,000 per day</option>
                            <option value="Sinharaja Forest Reserve - Full-day">Sinharaja Forest Reserve - Full-day - LKR 37,000 per day</option>
                        </optgroup>
                    </select>
                </div>

                <div className="form-group">
                    <label>Number of Adults:</label>
                    <input type="number" name="NoOfAdults" value={inputs.NoOfAdults} onChange={handleChange} required />
                </div>

                <div className="form-group">
                    <label>Number of Kids:</label>
                    <input type="number" name="NoOfKids" value={inputs.NoOfKids} onChange={handleChange} required />
                </div>

                <button type="submit" className="submit-button">Add Booking</button>
            </form>
        </div>
    );
}

export default AddRoom;*/

import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './AddRoom.css';

function AddRoom() {
  const navigate = useNavigate();
  const location = useLocation();
  const { safari, userData } = location.state || {}; // Get safari and userData from state

  const [inputs, setInputs] = useState({
    FirstName: userData?.FirstName || "",
    LastName: userData?.LastName || "",
    ContactNumber: "",
    Email: "",
    BookingDate: "",
    Schedule: safari?.name || "", // Pre-fill Schedule with safari name
    NoOfAdults: userData?.NoOfAdults || 0,
    NoOfKids: userData?.NoOfKids || 0,
    Nationality: "",
  });

  const [totalCost, setTotalCost] = useState(0);
  const [adultPrice, setAdultPrice] = useState(safari ? safari.pricePerPerson : 0);
  const [kidPrice, setKidPrice] = useState(safari ? safari.pricePerPerson * 0.5 : 0);

  // Price mapping for each safari type and duration
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

  // Recalculate total cost whenever inputs change
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:5000/users", {
        ...inputs,
        SafariType: inputs.Schedule,
        BookingDate: new Date(inputs.BookingDate),
      });

      alert("Booking updated successfully!");

      // Navigate to payment page with updated data
      navigate('/payment', {
        state: {
          FirstName: inputs.FirstName,
          LastName: inputs.LastName,
          SafariType: inputs.Schedule,
          NoOfAdults: inputs.NoOfAdults,
          NoOfKids: inputs.NoOfKids,
          totalCost: totalCost,
        },
      });
    } catch (error) {
      alert("Failed to update booking. Please try again.");
      console.error("Submission error:", error);
    }
  };

  return (
    <div className="add-room-container">
      <h1 className="form-title">Edit Safari Booking</h1>
      <form onSubmit={handleSubmit} className="booking-form">
        {/* Form fields with pre-filled data */}
        <div className="form-group">
          <label>First Name:</label>
          <input type="text" name="FirstName" value={inputs.FirstName} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label>Last Name:</label>
          <input type="text" name="LastName" value={inputs.LastName} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label>Contact Number:</label>
          <input type="text" name="ContactNumber" value={inputs.ContactNumber} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label>Email:</label>
          <input type="email" name="Email" value={inputs.Email} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label>Booking Date:</label>
          <input type="date" name="BookingDate" value={inputs.BookingDate} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label>Nationality:</label>
          <select name="Nationality" value={inputs.Nationality} onChange={handleChange} required>
            <option value="">Select Nationality</option>
            <option value="SRI LANKAN">SRI LANKAN</option>
            <option value="FOREIGN">FOREIGN</option>
          </select>
        </div>

        <div className="form-group">
          <label>Schedule:</label>
          <select name="Schedule" value={inputs.Schedule} onChange={handleChange} required>
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
        </div>

        <div className="form-group">
          <label>Number of Adults:</label>
          <input type="number" name="NoOfAdults" value={inputs.NoOfAdults} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label>Number of Kids:</label>
          <input type="number" name="NoOfKids" value={inputs.NoOfKids} onChange={handleChange} required />
        </div>

        <button type="submit" className="submit-button">Update Booking</button>
      </form>

      {/* Total Cost Box */}
      <div className="total-cost-box">
        <h3>Total Cost</h3>
        <p>1 Adult - LKR {adultPrice}</p>
        <p>1 Kid - LKR {kidPrice}</p>
        <hr />
        <p><strong>Total: LKR {totalCost}</strong></p>
      </div>
    </div>
  );
}

export default AddRoom;