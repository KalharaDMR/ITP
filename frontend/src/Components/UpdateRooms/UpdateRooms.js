import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

function UpdateRooms() {
  const [inputs, setInputs] = useState({
    roomNumber: "",
    roomType: "",
    pricePerNight: "",
    features: "",
    capacity: "",
    status: "",
    description: "",
    imageUrl: "",
  });

  const history = useNavigate();
  const { id } = useParams(); // Get the room ID from the URL

  // Fetch room details when the component mounts
  useEffect(() => {
    const fetchHandler = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/Rooms/${id}`);
        console.log("Fetched data:", response.data); // Debugging: Check fetched data
        if (response.data.Room) {
          setInputs(response.data.Room); // Set the form fields with fetched data
        } else {
          console.error("Room data not found in response:", response.data);
        }
      } catch (error) {
        console.error("Error fetching room details:", error);
      }
    };
    fetchHandler();
  }, [id]);

  // Handle form submission
  const sendRequest = async () => {
    try {
      await axios.put(`http://localhost:5000/Rooms/${id}`, {
        roomNumber: String(inputs.roomNumber),
        roomType: String(inputs.roomType),
        pricePerNight: Number(inputs.pricePerNight),
        features: String(inputs.features),
        capacity: String(inputs.capacity),
        status: String(inputs.status),
        description: String(inputs.description),
        imageUrl: String(inputs.imageUrl),
      });
      history("/Roomdetails"); // Redirect after successful update
    } catch (error) {
      console.error("Error updating room:", error);
    }
  };

  // Handle input changes
  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    sendRequest();
  };

  return (
    <div>
      <div className="update-room-container">
        <h1>Update Room</h1>
        <form className="update-room-form" onSubmit={handleSubmit}>
          <label>Room Number</label>
          <input
            type="text"
            name="roomNumber"
            onChange={handleChange}
            value={inputs.roomNumber || ""}
            required
          />
          <br />
          <label>Room Type</label>
          <input
            type="text"
            name="roomType"
            onChange={handleChange}
            value={inputs.roomType || ""}
            required
          />
          <br />
          <label>Price Per Night</label>
          <input
            type="text"
            name="pricePerNight"
            onChange={handleChange}
            value={inputs.pricePerNight || ""}
            required
          />
          <br />
          <label>Features</label>
          <input
            type="text"
            name="features"
            onChange={handleChange}
            value={inputs.features || ""}
            required
          />
          <br />
          <label>Capacity</label>
          <input
            type="text"
            name="capacity"
            onChange={handleChange}
            value={inputs.capacity || ""}
            required
          />
          <br />
          <label>Status</label>
          <input
            type="text"
            name="status"
            onChange={handleChange}
            value={inputs.status || ""}
            required
          />
          <br />
          <label>Description</label>
          <input
            type="text"
            name="description"
            onChange={handleChange}
            value={inputs.description || ""}
            required
          />
          <br />
          <label>Image URL</label>
          <input
            type="text"
            name="imageUrl"
            onChange={handleChange}
            value={inputs.imageUrl || ""}
            required
          />
          <br />
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
}

export default UpdateRooms;