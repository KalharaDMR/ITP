import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './SafariTypes.css';

function SafariTypes() {
  const navigate = useNavigate(); // Initialize useNavigate

  // Static data for safaris with local image paths
  const safaris = [
    {
      id: 1,
      name: "Block 1 (Palatupana)",
      location: "Palatupana, Sri Lanka",
      details: "Booked in last 2 hours",
      pricePerPerson: 3500,
      bookingsLast24Hours: 3,
      imageUrl: "/images/safari12.jpeg", // Local image path
    },
    {
      id: 2,
      name: "Block 1 (Katagamuwa)",
      location: "Yala, Sri Lanka",
      pricePerPerson: 2500,
      bookingsLast24Hours: 4,
      imageUrl: "/images/safari15.jpeg", // Local image path
    },
    {
      id: 3,
      name: "Blocks 4&5 (Galge)",
      location: "Yala, Sri Lanka",
      details: "Booked in last 4 hours",
      pricePerPerson: 2800,
      bookingsLast24Hours: 1,
      imageUrl: "/images/safari8.jpeg", // Local image path
    },
    {
      id: 4,
      name: "Yala National Park",
      location: "Yala, Sri Lanka",
      pricePerPerson: 3500,
      bookingsLast24Hours: 5,
      imageUrl: "/images/safari14.jpeg", // Local image path
    },
    {
      id: 5,
      name: "Udawalawe National Park",
      location: "Udawalawe, Sri Lanka",
      details: "Booked in last 8 hours",
      pricePerPerson: 3800,
      bookingsLast24Hours: 2,
      imageUrl: "/images/safari2.jpeg", // Local image path
    },
    {
      id: 6,
      name: "Wilpattu National Park",
      location: "Wilpattu, Sri Lanka",
      details: "Booked in last 10 hours",
      pricePerPerson: 4500,
      bookingsLast24Hours: 3,
      imageUrl: "/images/safari7.jpeg", // Local image path
    },
    {
      id: 7,
      name: "Minneriya National Park",
      location: "Minneriya, Sri Lanka",
      pricePerPerson: 4800,
      bookingsLast24Hours: 4,
      imageUrl: "/images/safari9.jpeg", // Local image path
    },
    {
      id: 8,
      name: "Horton Plains National Park",
      location: "Nuwara Eliya, Sri Lanka",
      details: "Booked in last 14 hours",
      pricePerPerson: 3200,
      bookingsLast24Hours: 2,
      imageUrl: "/images/safari4.jpeg", // Local image path
    },
    {
      id: 9,
      name: "Kumana National Park",
      location: "Kumana, Sri Lanka",
      pricePerPerson: 5000,
      bookingsLast24Hours: 1,
      imageUrl: "images/safari3.jpeg", // Local image path
    },
  ];

  // Function to handle "View Rates" button click
  const handleViewRates = (safari) => {
    console.log("Navigating to AddRoom with safari:", safari); // Debugging statement
    navigate('/addroom', { state: { safari } }); // Navigate to AddRoom with safari data
  };

  return (
    <div className="safari-types-container">
      <h1>SELECT A SAFARI</h1>
      <div className="sort-by">
        <span>Sort By: Relevance</span>
      </div>
      <div className="safari-grid">
        {safaris.map((safari) => (
          <div key={safari.id} className="safari-card">
            <img
              src={safari.imageUrl} // Use local image path
              alt={safari.name}
              className="safari-image"
            />
            <h2>{safari.name}</h2>
            <p className="location">{safari.location}</p>
            <p className="details">{safari.details}</p>
            <p className="bookings">{safari.bookingsLast24Hours} people booked in last 24 hours</p>
            <p className="price">From LKR {safari.pricePerPerson} Per Person</p>
            <p className="taxes">Excluding taxes and fees</p>
            <button
              className="view-rates"
              onClick={() => handleViewRates(safari)} // Pass safari details
            >
              View rates
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SafariTypes;