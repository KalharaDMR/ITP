import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import './UpdateRoom.css'; // Updated import


function UpdateRoom() {
  const [inputs, setInputs] = useState({
    FirstName: "",
    LastName: "",
    ContactNumber: "",
    Email: "",
    BookingDate: "",
    SafariType: "",
    NoOfAdults: 0,
    NoOfKids: 0,
    Nationality: ""
  });

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchHandler = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/users/${id}`);
        setInputs(response.data.user); // Set the fetched data to the state
      } catch (error) {
        console.error("Error fetching booking details:", error);
      }
    };
    fetchHandler();
  }, [id]);

  const sendRequest = async () => {
    try {
      const response = await axios.put(`http://localhost:5000/users/${id}`, {
        FirstName: String(inputs.FirstName),
        LastName: String(inputs.LastName),
        ContactNumber: String(inputs.ContactNumber),
        Email: String(inputs.Email),
        BookingDate: new Date(inputs.BookingDate),
        SafariType: String(inputs.SafariType),
        NoOfAdults: Number(inputs.NoOfAdults),
        NoOfKids: Number(inputs.NoOfKids),
        Nationality: String(inputs.Nationality),
      });
      return response.data;
    } catch (error) {
      console.error("Error updating booking:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form Data:", inputs);
    await sendRequest();
    alert("Booking updated successfully!");
    navigate('/roomdetails'); // Redirect to the room details page
  };

  return (
    <div className="add-room-container">
      <h1 className="form-title">Update Safari</h1>
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
          <label>Safari Type:</label>
          <select name="SafariType" value={inputs.SafariType} onChange={handleChange} required>
          <option value="">Select Safari Type</option>
            <optgroup label="Block 1 (Palatupana)">
              <option value="Block 1 (Palatupana) - Half-day (Morning)">Half-day (Morning) </option>
              <option value="Block 1 (Palatupana) - Half-day (Afternoon)">Half-day (Afternoon) </option>
              <option value="Block 1 (Palatupana) - Full-day">Full-day </option>
            </optgroup>
            <optgroup label="Block 1 (Katagamuwa)">
              <option value="Block 1 (Katagamuwa) - Half-day (Morning)">Half-day (Morning) -</option>
              <option value="Block 1 (Katagamuwa) - Half-day (Afternoon)">Half-day (Afternoon) - </option>
              <option value="Block 1 (Katagamuwa) - Full-day">Full-day </option>
            </optgroup>
            <optgroup label="Blocks 4&5 (Galge)">
              <option value="Blocks 4&5 (Galge) - Half-day (Morning)">Half-day (Morning) </option>
              <option value="Blocks 4&5 (Galge) - Half-day (Afternoon)">Half-day (Afternoon) </option>
              <option value="Blocks 4&5 (Galge) - Full-day">Full-day</option>
            </optgroup>
            <optgroup label="Additional Safari Destinations">
              <option value="Yala National Park - Full-day">Yala National Park - Full-day </option>
              <option value="Udawalawe National Park - Half-day (Morning)">Udawalawe National Park - Half-day (Morning) </option>
              <option value="Wilpattu National Park - Full-day">Wilpattu National Park - Full-day </option>
              <option value="Minneriya National Park - Half-day (Morning)">Minneriya National Park - Half-day (Morning) </option>
              <option value="Maduru Oya National Park - Half-day (Afternoon)">Maduru Oya National Park - Half-day (Afternoon) </option>
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
    </div>
  );
}

export default UpdateRoom;