import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
//import './RoomDetails.css';

function RoomDetails(props) {
  const { _id, roomNumber, roomType, pricePerNight, features, capacity, status, description, imageUrl } = props.room || {};

  if (!props.room) {
    return <div>Loading...</div>;
  }

  const deleteHandler = async () => {
    try {
      await axios.delete(`http://localhost:5000/Rooms/${_id}`);
      window.location.reload();
    } catch (error) {
      console.error('Error deleting room:', error);
    }
  };

  return (
    <div className="room-details">
      <h2>Room Number: {roomNumber}</h2>
      <p><strong>Room Type:</strong> {roomType}</p>
      <p><strong>Price:</strong> {pricePerNight}</p>
      <p><strong>Features:</strong> {features}</p>
      <p><strong>Capacity:</strong> {capacity}</p>
      <p><strong>Status:</strong> {status}</p>
      <p><strong>Description:</strong> {description}</p>
      <p><strong>Image URL:</strong> {imageUrl}</p>
      <div className="room-actions">
        <Link to={`/Roomdetails/${_id}`} className="update-button">Update</Link>
        <button onClick={deleteHandler} className="delete-button">Delete</button>
      </div>
    </div>
  );
}

export default RoomDetails;