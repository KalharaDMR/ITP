import React from 'react';

function User({ user }) {
  const {
    _id = "",
    FirstName = "",
    LastName = "",
    ContactNumber = "",
    Email = "",
    BookingDate = "",
    SafariType = "",
    NoOfAdults = false,
    NoOfKids = "",
    Nationality = ""
  } = user;

  return (
    <div>
      <h2>ID: {_id}</h2>
      <h2>FirstName: {FirstName}</h2>
      <h2>LastName: {LastName}</h2>
      <h2>ContactNumber: {Email}</h2>
      <h2>Email: {Email}</h2>
      <h2>BookingDate: {BookingDate}</h2>
      <h2>SafariType: {SafariType}</h2>
      <h2>NoOfAdults: {NoOfAdults}</h2>
      <h2>NoOfKids: {NoOfKids}</h2>
      <h2>Nationality: {Nationality}</h2>

    </div>
  );
}

export default User; // Ensure this is a default export

/*import React, { useState } from 'react';
import Nav from '../Nav/Nav';
import { useNavigate } from "react-router";
import axios from "axios";

function AddRoom() {
  const history = useNavigate();
  const [inputs, setInputs] = useState({
    FirstName: "",
    LastName: "",
    Email: "",
    RoomType: "",
    ArrivalDateandTime: "",
    DepartureDate: "",
    FreePickup: "No", // Default value
    SpecialRequests: "",
  });

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
      await sendRequest();
      history('/roomdetails'); // Navigate to room details page after submission
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Failed to add room booking. Please try again.");
    }
  };

  const sendRequest = async () => {
    const response = await axios.post("http://localhost:5000/rooms", {
      FirstName: inputs.FirstName,
      LastName: inputs.LastName,
      Email: inputs.Email,
      RoomType: inputs.RoomType,
      ArrivalDateandTime: inputs.ArrivalDateandTime,
      DepartureDate: inputs.DepartureDate,
      FreePickup: inputs.FreePickup,
      SpecialRequests: inputs.SpecialRequests,
    });
    return response.data;
  };

  return (
    <div>
      <Nav />
      <h1>Add Room Booking</h1>
      <form onSubmit={handleSubmit}>
        <label>First Name</label>
        <br />
        <input
          type="text"
          name="FirstName"
          onChange={handleChange}
          value={inputs.FirstName}
          required
        />
        <br />
        <br />

        <label>Last Name</label>
        <br />
        <input
          type="text"
          name="LastName"
          onChange={handleChange}
          value={inputs.LastName}
          required
        />
        <br />
        <br />

        <label>Email</label>
        <br />
        <input
          type="email"
          name="Email"
          onChange={handleChange}
          value={inputs.Email}
          required
        />
        <br />
        <br />

        <label>Room Type</label>
        <br />
        <input
          type="text"
          name="RoomType"
          onChange={handleChange}
          value={inputs.RoomType}
          required
        />
        <br />
        <br />

        <label>Arrival Date & Time</label>
        <br />
        <input
          type="datetime-local"
          name="ArrivalDateandTime"
          onChange={handleChange}
          value={inputs.ArrivalDateandTime}
          required
        />
        <br />
        <br />

        <label>Departure Date</label>
        <br />
        <input
          type="date"
          name="DepartureDate"
          onChange={handleChange}
          value={inputs.DepartureDate}
          required
        />
        <br />
        <br />

        <label>Free Pickup</label>
        <br />
        <select
          name="FreePickup"
          onChange={handleChange}
          value={inputs.FreePickup}
          required
        >
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>
        <br />
        <br />

        <label>Special Requests</label>
        <br />
        <textarea
          name="SpecialRequests"
          onChange={handleChange}
          value={inputs.SpecialRequests}
        />
        <br />
        <br />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default AddRoom;*/


/*import React from 'react';
import { Link } from "react-router-dom";
import axios from "axios";
import {useNavigate} from "react-router-dom";

function User(props) {
  const {_id, name, gmail, age, address} = props.user;

  const history = useNavigate();

  const deleteHandler = async()=>{
    await axios.delete(`http://localhost:5000/users/${_id}`)
    .then(res=>res.data)
    .then(() =>history("/"))
    .then(() =>history("/usersdetails"))
  }

  return (
    <div>
        <h1>User Display</h1>
        <br></br>
        <h1>ID:{_id}</h1>
        <h1>Name:{name}</h1>
        <h1>Gmail:{gmail}</h1>
        <h1>Age:{age}</h1>
        <h1>Address:{address}</h1>
        <Link to={`/userdetails/${_id}`}>Update</Link>
        <button onClick={deleteHandler}>Delete</button>
        <br></br><br></br><br></br><br></br>
        </div>
  )
}
export default User*/