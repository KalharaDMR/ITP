import React, { useEffect, useRef, useState, handleSendReport } from 'react';
import axios from "axios";
import EventRoom from './EventRoom';
import { useReactToPrint } from "react-to-print";
import './EventRooms.css';

const URL = "http://localhost:5000/events";

function EventRooms() {
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [noResults, setNoResults] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const componentsRef = useRef();
  const isAdmin = localStorage.getItem('adminAuth');

  // Move useReactToPrint to the top level
  const handlePrint = useReactToPrint({
    content: () => componentsRef.current,
    documentTitle: "Event Bookings Report",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(URL);
        const eventsData = response.data.events || response.data || [];
        setEvents(eventsData);
        setFilteredEvents(eventsData);
        if (eventsData.length === 0) {
          setError("No event bookings found");
        }
      } catch (err) {
        console.error("Error fetching events:", err);
        setError(err.response?.data?.message || "Failed to load event bookings");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleSearch = () => {
    const filtered = events.filter((evt) =>
      Object.values(evt).some(
        (field) =>
          field &&
          field.toString().toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
    setFilteredEvents(filtered);
    setNoResults(filtered.length === 0);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this event booking?")) {
      return;
    }

    try {
      const response = await axios.delete(`${URL}/${id}`);
      if (response.status === 200) {
        setEvents((prev) => prev.filter((evt) => evt._id !== id));
        setFilteredEvents((prev) => prev.filter((evt) => evt._id !== id));
        alert("Event booking deleted successfully!");
      }
    } catch (error) {
      console.error("Delete error:", error);
      setError("Failed to delete booking");
    }
  };

  if (loading) {
    return <div className="loading">Loading event bookings...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="event-rooms-container">
      <h1 className="page-title">Event Booking Details</h1>

      <div className="search-container">
        <input
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          type="text"
          name="search"
          placeholder="Search event details..."
          className="search-input"
          onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
        />
        <button onClick={handleSearch} className="search-button">
          Search
        </button>
      </div>

      {noResults ? (
        <div className="no-results">
          <p>No events found matching your search</p>
        </div>
      ) : (
        <>
          <div ref={componentsRef} className="events-list">
            {filteredEvents.map((evt) => (
              <EventRoom
                key={evt._id}
                event={evt}
                onDelete={handleDelete}
                isAdmin={isAdmin}
              />
            ))}
          </div>
          
           {/* Download Report Button */}
      <button onClick={() => window.print()} className="download-button">
        <i className="fas fa-download"></i> Download Report
      </button>
      <br></br>
      <button onClick={handleSendReport}>Send WhatsApp Message</button>
    
        </>
      )}
    </div>
  );
}

export default EventRooms;