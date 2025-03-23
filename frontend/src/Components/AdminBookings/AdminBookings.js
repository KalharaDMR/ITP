import React, { useEffect, useState } from "react";
import axios from "axios";
import { useReactToPrint } from "react-to-print";
import "./AdminBookings.css";

function AdminBookings() {
  const [bookings, setBookings] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axios.get("http://localhost:5000/admin/bookings", {
          headers: {
            Authorization: localStorage.getItem("admin"),
          },
        });

        if (response.data.status === "ok") {
          setBookings(response.data.bookings);
        } else {
          setError("Failed to fetch bookings");
        }
      } catch (err) {
        setError("An error occurred. Please try again.");
      }
    };

    fetchBookings();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/users/${id}`, {
        headers: {
          Authorization: localStorage.getItem("admin"),
        },
      });
      setBookings((prev) => prev.filter((booking) => booking._id !== id));
    } catch (err) {
      setError("Failed to delete booking");
    }
  };

  const handlePrint = useReactToPrint({
    content: () => document.getElementById("bookings-table"),
  });

  return (
    <div className="admin-bookings-container">
      <h1>Admin Bookings</h1>
      {error && <p className="error-message">{error}</p>}
      <button onClick={handlePrint} className="print-button">Download PDF</button>
      <table id="bookings-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Safari Type</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((booking) => (
            <tr key={booking._id}>
              <td>{booking._id}</td>
              <td>{booking.FirstName} {booking.LastName}</td>
              <td>{booking.Email}</td>
              <td>{booking.SafariType}</td>
              <td>
                <button onClick={() => handleDelete(booking._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminBookings;