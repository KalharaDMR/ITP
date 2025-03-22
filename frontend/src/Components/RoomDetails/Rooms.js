/*import React, {useEffect, useState} from 'react';
import Nav from "../Nav/Nav";
import axios from "axios";
import User from '../Room/Room';

const URL="http://localhost:5000/users";


const fetchHandler = async () =>{
  return await axios.get(URL).then((res) => res.data);
}

function Rooms() {
  
  const [Rooms,setRooms] = useState();
  useEffect(()=> {
    fetchHandler().then((data)=> setRooms(data.Rooms));
  }, [])

  return (
    <div>
        <Nav/>
        <h1>Room Details Display page</h1>
        <div>
          {Rooms && Rooms.map((user, i)=>(
            <div key={i}>
              <User user={user}/>
              </div>
          ))}
        </div>
    </div>
  );
}

export default Rooms*/

/*import React, { useEffect, useState } from 'react';
import Nav from "../Nav/Nav";
import axios from "axios";
import User from '../User/User';

const URL = "http://localhost:5000/users";

const fetchHandler = async () => {
  try {
    const response = await axios.get(URL);
    return response.data; // Assuming the API returns an array of rooms
  } catch (error) {
    console.error("Error fetching rooms:", error);
    return []; // Return an empty array in case of an error
  }
};

function Rooms() {
  const [rooms, setRooms] = useState([]); // Initialize as an empty array

  useEffect(() => {
    fetchHandler().then((data) => setRooms(data)); // Set the rooms directly
  }, []);

  return (
    <div>
      <Nav />
      <h1>Room Details Display Page</h1>
      <div>
        {rooms.length > 0 ? (
          rooms.map((user, i) => (
            <div key={i}>
              <User user={user} />
            </div>
          ))
        ) : (
          <p>No rooms available</p>
        )}
      </div>
    </div>
  );
}

export default Rooms;*/


/*import React, { useEffect, useState } from 'react';
import Nav from "../Nav/Nav";
import axios from "axios";
import User from '../Room/Room';

const URL = "http://localhost:5000/users";

const fetchHandler = async () => {
  try {
    console.log("Fetching rooms..."); // Debugging
    const response = await axios.get(URL);
    console.log("Response:", response); // Debugging
    return response.data; // Assuming the API returns an array of rooms
  } catch (error) {
    console.error("Error fetching rooms:", error);
    return []; // Return an empty array in case of an error
  }
};

function Rooms() {
  const [rooms, setRooms] = useState([]); // Initialize as an empty array

  useEffect(() => {
    fetchHandler().then((data) => {
      console.log("Data:", data); // Debugging
      setRooms(data);
    });
  }, []);

  return (
    <div>
      <Nav />
      <h1>Room Details Display Page</h1>
      <div>
        {rooms.length > 0 ? (
          rooms.map((user, i) => (
            <div key={i}>
              <User user={user} />
            </div>
          ))
        ) : (
          <p>No rooms available</p>
        )}
      </div>
    </div>
  );
}

export default Rooms;*/


/*import React, { useEffect, useState } from 'react';
import Nav from "../Nav/Nav";
import axios from "axios";
import Room from '../Room/Room'; // Import the Room component

const URL = "http://localhost:5000/users";

const fetchHandler = async () => {
  try {
    const response = await axios.get(URL);
    return response.data; // Return the array directly
  } catch (error) {
    console.error("Error fetching rooms:", error);
    return []; // Return an empty array in case of an error
  }
};

function Rooms() {
  const [rooms, setRooms] = useState([]); // Initialize as an empty array

  useEffect(() => {
    fetchHandler().then((data) => {
      console.log("Data:", data); // Debugging
      setRooms(data); // Set the rooms directly
    });
  }, []);

  const handleUpdate = (user) => {
    // Implement update logic here
    console.log("Update user:", user);
    // Example: Open a modal or navigate to an update form
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/users/${id}`);
      // Remove the deleted user from the state
      setRooms((prevRooms) => prevRooms.filter((room) => room._id !== id));
      console.log("User deleted successfully");
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <div>
      <Nav />
      <h1>Safari Details Display Page</h1>
      <div>
        {rooms.length > 0 ? (
          rooms.map((user, i) => (
            <div key={i}>
              <Room user={user} onUpdate={handleUpdate} onDelete={handleDelete} />
            </div>
          ))
        ) : (
          <p>No Safari available</p>
        )}
      </div>
    </div>
  );
}

export default Rooms;*/

/*import React, { useEffect, useRef, useState } from 'react';
import axios from "axios";
import Room from '../Room/Room';
import { useReactToPrint } from "react-to-print";

const URL = "http://localhost:5000/users";

const fetchHandler = async () => {
  try {
    const response = await axios.get(URL);
    return response.data.Users; // Ensure this matches the backend response structure
  } catch (error) {
    console.error("Error fetching rooms:", error);
    return [];
  }
};

function Rooms() {
  const [rooms, setRooms] = useState([]); // Main data state
  const [filteredRooms, setFilteredRooms] = useState([]); // State for filtered results
  const [searchQuery, setSearchQuery] = useState(""); // Search query state
  const [noResults, setNoResults] = useState(false); // No results flag
  const componentsRef = useRef();

  // Fetch data on component mount
  useEffect(() => {
    fetchHandler().then((data) => {
      console.log("Data:", data);
      setRooms(data);
      setFilteredRooms(data); // Initialize filteredRooms with all data
    });
  }, []);

  // Handle search functionality
  const handleSearch = () => {
    const filtered = rooms.filter((user) =>
      Object.values(user).some((field) =>
        field.toString().toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
    setFilteredRooms(filtered); // Update filteredRooms state
    setNoResults(filtered.length === 0); // Set noResults flag
  };

  // Handle print functionality
  const handlePrint = useReactToPrint({
    content: () => componentsRef.current,
    documentTitle: "Safari Report",
    onAfterPrint: () => alert("Your Safari Report Downloaded Successfully!"),
  });

  // Handle update functionality
  const handleUpdate = (user) => {
    console.log("Update user:", user);
  };

  // Handle delete functionality
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/users/${id}`);
      setRooms((prevRooms) => prevRooms.filter((room) => room._id !== id));
      setFilteredRooms((prevFiltered) =>
        prevFiltered.filter((room) => room._id !== id)
      );
      console.log("User deleted successfully");
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <div>
      <h1>Safari Booking Details Display Page</h1>
      <input
        onChange={(e) => setSearchQuery(e.target.value)}
        type="text"
        name="search"
        placeholder="Search Safari Details"
      />
      <button onClick={handleSearch}>Search</button>

      {noResults ? (
        <div>
          <p>No Safari Found</p>
        </div>
      ) : (
        <div ref={componentsRef}>
          {filteredRooms.length > 0 ? (
            filteredRooms.map((user, i) => (
              <div key={i}>
                <Room user={user} onUpdate={handleUpdate} onDelete={handleDelete} />
              </div>
            ))
          ) : (
            <p>No bookings available</p>
          )}
        </div>
      )}
      <button onClick={() => window.print()}>Download Report</button>
    </div>
  );
}

export default Rooms;*/

import React, { useEffect, useRef, useState } from 'react';
import axios from "axios";
import Room from '../Room/Room';
import { useReactToPrint } from "react-to-print";
import './Rooms.css'; // Import the updated CSS file

const URL = "http://localhost:5000/users";

const fetchHandler = async () => {
  try {
    const response = await axios.get(URL);
    console.log("Fetch Response:", response.data); // Debugging statement
    return response.data.Users; // Ensure this matches the backend response structure
  } catch (error) {
    console.error("Error fetching rooms:", error);
    return [];
  }
};

function Rooms() {
  const [rooms, setRooms] = useState([]); // Main data state
  const [filteredRooms, setFilteredRooms] = useState([]); // State for filtered results
  const [searchQuery, setSearchQuery] = useState(""); // Search query state
  const [noResults, setNoResults] = useState(false); // No results flag
  const componentsRef = useRef();

  // Fetch data on component mount
  useEffect(() => {
    fetchHandler().then((data) => {
      console.log("Fetched Data:", data); // Debugging statement
      setRooms(data);
      setFilteredRooms(data); // Initialize filteredRooms with all data
    });
  }, []);

  // Handle search functionality
  const handleSearch = () => {
    const filtered = rooms.filter((user) =>
      Object.values(user).some((field) =>
        field.toString().toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
    console.log("Filtered Rooms:", filtered); // Debugging statement
    setFilteredRooms(filtered); // Update filteredRooms state
    setNoResults(filtered.length === 0); // Set noResults flag
  };

  // Handle print functionality
  const handlePrint = useReactToPrint({
    content: () => componentsRef.current,
    documentTitle: "Safari Report",
    onAfterPrint: () => alert("Your Safari Report Downloaded Successfully!"),
  });

  // Handle update functionality
  const handleUpdate = (user) => {
    console.log("Update user:", user);
  };

  // Handle delete functionality
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/users/${id}`);
      setRooms((prevRooms) => prevRooms.filter((room) => room._id !== id));
      setFilteredRooms((prevFiltered) =>
        prevFiltered.filter((room) => room._id !== id)
      );
      console.log("User deleted successfully");
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const handleSendReport = () => {
    //create the whatsapp chat URL
    const phoneNumber = "+94774946204";
    const message = `selected Safari Reports`;
    const whatsappUrl = `https://web.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(message)}`;

    //open the whatsapp for chat in new window
    window.open(whatsappUrl, "_blank");
  };

  return (
    <div className="rooms-container">
      <h1 className="page-title">Safari Booking Details Display Page</h1>

      {/* Search Bar */}
      <div className="search-container">
        <input
          onChange={(e) => setSearchQuery(e.target.value)}
          type="text"
          name="search"
          placeholder="Search Safari Details"
          className="search-input"
        />
        <button onClick={handleSearch} className="search-button">
          <i className="fas fa-search"></i> {/* Font Awesome search icon */}
        </button>
      </div>

      {/* No Results Message */}
      {noResults && (
        <div className="no-results">
          <p>No Safari Found</p>
        </div>
      )}

      {/* Display Filtered Rooms */}
      <div ref={componentsRef} className="rooms-list">
        {filteredRooms.length > 0 ? (
          filteredRooms.map((user, i) => (
            <div key={i}>
              <Room user={user} onUpdate={handleUpdate} onDelete={handleDelete} />
            </div>
          ))
        ) : (
          <p className="no-bookings">No bookings available</p>
        )}
      </div>

      {/* Download Report Button */}
      <button onClick={() => window.print()} className="download-button">
        <i className="fas fa-download"></i> Download Report
      </button>
      <br></br>
      <button onClick={handleSendReport}>Send WhatsApp Message</button>
    </div>
  );
}

export default Rooms;