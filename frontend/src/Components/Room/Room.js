import React, { useState, useEffect } from 'react';
import Nav from "../Nav/Nav";
import axios from "axios";
import RoomDetails from "../RoomDetails/RoomDetails";
import { useNavigate } from 'react-router-dom'; // Import useNavigate for redirection

const URL = "http://localhost:5000/Rooms/";

const fetchHandler = async () => {
  try {
    const response = await axios.get(URL);
    return response.data.Room; // Ensure this matches the backend response structure
  } catch (error) {
    console.error("Error fetching rooms:", error);
    return []; // Return an empty array if there's an error
  }
};

function Room() {
  const [rooms, setRooms] = useState([]);
  const history = useNavigate(); // Initialize useNavigate for redirection

  useEffect(() => {
    fetchHandler().then((data) => {
      if (Array.isArray(data)) {
        setRooms(data); // Set rooms only if data is an array
      } else {
        console.error("Expected an array but got:", data);
        setRooms([]); // Fallback to an empty array
      }
    });
  }, []);

  return (
    <div>
      <Nav />
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px' }}>
        <h1>Availabe Rooms</h1>
        <button
          onClick={() => history("/AddRooms")} // Redirect to the Add Room form
          style={{
            padding: '10px 20px',
            backgroundColor: '#007bff',
            color: '#fff',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
          }}
        >
          Add Room
        </button>
      </div>
      <div>
        {rooms.map((room, i) => (
          <div key={i}>
            <RoomDetails room={room} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Room;