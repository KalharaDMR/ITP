/*import React from 'react'

function Room(props) {

const{_id,FirstName, LastName,  Email,  RoomType, ArrivalDateandTime, DepartureDate,  FreePickup, SpecialRequests}= props.Room;

  return (
    <div>
      <h1>Room Display</h1>
      <br></br>
      <h1>ID:{_id}</h1>
      <h1>FirstName:{FirstName}</h1>
      <h1>LastName:{LastName}</h1>
      <h1>Email:{Email}</h1>
      <h1>RoomType:{RoomType}</h1>
      <h1>ArrivalDateandTime:{ArrivalDateandTime}</h1>
      <h1>DepartureDate:{DepartureDate}</h1>
      <h1>FreePickup:{FreePickup}</h1>
      <h1>SpecialRequests:{SpecialRequests}</h1>
      <button>Update</button>
      <button>Delete</button>


      </div>
  )
}

export default Room*/

/*import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function Room() {
  const { id } = useParams(); // Get the room ID from the URL
  const [room, setRoom] = useState(null);

  useEffect(() => {
    console.log("Fetching room data for ID:", id); // Debugging
    fetch(`http://localhost:5000/users`) // Fetch all users
      .then((response) => {
        console.log("Response:", response); // Debugging
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Data:", data); // Debugging
        // Find the user with the matching ID
        const user = data.find((user) => user._id === id);
        if (user) {
          setRoom(user);
        } else {
          console.error("User not found");
        }
      })
      .catch((error) => {
        console.error("Error fetching room data:", error);
      });
  }, [id]);

  if (!room) {
    return <div>Loading...</div>;
  }

  const {
    _id = "",
    FirstName = "",
    LastName = "",
    Email = "",
    RoomType = "",
    ArrivalDateandTime = "",
    DepartureDate = "",
    FreePickup = false,
    SpecialRequests = ""
  } = room;

  return (
    <div>
      <h1>Room Display</h1>
      <br />
      <h1>ID: {_id}</h1>
      <h1>FirstName: {FirstName}</h1>
      <h1>LastName: {LastName}</h1>
      <h1>Email: {Email}</h1>
      <h1>RoomType: {RoomType}</h1>
      <h1>ArrivalDateandTime: {ArrivalDateandTime}</h1>
      <h1>DepartureDate: {DepartureDate}</h1>
      <h1>FreePickup: {FreePickup}</h1>
      <h1>SpecialRequests: {SpecialRequests}</h1>
      <button>Update</button>
      <button>Delete</button>
    </div>
  );
}

export default Room;*/


/*import React from 'react';

function Room({ user }) {
  const {
    _id = "",
    FirstName = "",
    LastName = "",
    Email = "",
    RoomType = "",
    ArrivalDateandTime = "",
    DepartureDate = "",
    FreePickup = false,
    SpecialRequests = ""
  } = user;

  return (
    <div>
      <h1>Room Display</h1>
      <br />
      <h1>ID: {_id}</h1>
      <h1>FirstName: {FirstName}</h1>
      <h1>LastName: {LastName}</h1>
      <h1>Email: {Email}</h1>
      <h1>RoomType: {RoomType}</h1>
      <h1>ArrivalDateandTime: {ArrivalDateandTime}</h1>
      <h1>DepartureDate: {DepartureDate}</h1>
      <h1>FreePickup: {FreePickup}</h1>
      <h1>SpecialRequests: {SpecialRequests}</h1>
      <button>Update</button>
      <button>Delete</button>
    </div>
  );
}

export default Room; // Ensure this is a default export*/

/*import React from 'react';
import axios from 'axios';
import './Room.css'; // Import the CSS file

function Room({ user, onUpdate, onDelete }) {
  const {
    _id = "",
    FirstName = "",
    LastName = "",
    ContactNumber = "",
    Email = "",
    BookingDate = "",
    Schedule = "",
    NoOfAdults = false,
    NoOfKids = "",
    Nationality=""
  } = user;

  const handleUpdate = () => {
    if (onUpdate) {
      onUpdate(user); // Pass the user data to the parent component
    }
  };

  const handleDelete = () => {
    if (onDelete) {
      onDelete(_id); // Pass the user ID to the parent component
    }
  };

  return (
    <div className="room-container">
      <h1>Room Display</h1>
      <br />
      <h1>ID: {_id}</h1>
      <h1>FirstName: {FirstName}</h1>
      <h1>LastName: {LastName}</h1>
      <h1>ContactNumber: {ContactNumber}</h1>
      <h1>Email: {Email}</h1>
      <h1>BookingDate: {BookingDate}</h1>
      <h1>Schedule: {Schedule}</h1>
      <h1>NoOfAdults: {NoOfAdults}</h1>
      <h1>NoOfKids: {NoOfKids}</h1>
      <h1>Nationality: {Nationality}</h1>
      <button onClick={handleUpdate}>Update</button>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
}

export default Room;*/

import React from 'react';
import './Room.css'; // Import the CSS file
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import axios from 'axios';

function Room({ user, onDelete }) {
  const {
    _id = "",
    FirstName = "",
    LastName = "",
    ContactNumber = "",
    Email = "",
    BookingDate = "",
    SafariType = "",
    NoOfAdults = 0,
    NoOfKids = 0,
    Nationality = ""
  } = user;

  const navigate = useNavigate(); // Initialize useNavigate

  const handleDelete = () => {
    if (onDelete) {
      onDelete(_id); // Pass the user ID to the parent component
    }
  };

  const handleUpdate = () => {
    navigate(`/update/${_id}`); // Navigate to the UpdateRoom component
  };

  return (
    <div className="room-container">
      <h1>Safari Display</h1>
      <br />
      <h1>ID: {_id}</h1>
      <h1>FirstName: {FirstName}</h1>
      <h1>LastName: {LastName}</h1>
      <h1>ContactNumber: {ContactNumber}</h1>
      <h1>Email: {Email}</h1>
      <h1>BookingDate: {BookingDate}</h1>
      <h1>SafariType: {SafariType}</h1>
      <h1>NoOfAdults: {NoOfAdults}</h1>
      <h1>NoOfKids: {NoOfKids}</h1>
      <h1>Nationality: {Nationality}</h1>
      <button onClick={handleUpdate} className="update-button">Update</button> {/* Use onClick for navigation */}
      <button onClick={handleDelete} className="delete-button">Delete</button>
    </div>
  );
}

export default Room;