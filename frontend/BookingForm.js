import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useHistory } from 'react-router-dom';

const BookingForm = () => {
    const [booking, setBooking] = useState({
        userId: '',
        roomId: '',
        checkInDate: '',
        checkOutDate: '',
        totalAmount: ''
    });

    const { id } = useParams();  // This will get the booking ID from the URL for updating the booking
    const history = useHistory();  // This will be used to redirect the user after the form is submitted

    useEffect(() => {
        // If we are editing an existing booking, fetch the data
        if (id) {
            axios.get(`/api/bookings/${id}`)
                .then(response => {
                    setBooking(response.data);  // Pre-fill the form with existing booking data
                })
                .catch(error => {
                    console.error("There was an error fetching the booking!", error);
                });
        }
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setBooking(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Check if we're updating or creating a new booking
        if (id) {
            // Update booking
            axios.put(`/api/bookings/${id}`, booking)
                .then(response => {
                    alert("Booking updated successfully");
                    history.push('/bookings');  // Redirect to the bookings list page
                })
                .catch(error => {
                    console.error("There was an error updating the booking!", error);
                });
        } else {
            // Create a new booking
            axios.post('/api/bookings', booking)
                .then(response => {
                    alert("Booking created successfully");
                    history.push('/bookings');  // Redirect to the bookings list page
                })
                .catch(error => {
                    console.error("There was an error creating the booking!", error);
                });
        }
    };

    return (
        <div>
            <h2>{id ? 'Update Booking' : 'Create Booking'}</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="userId">User ID:</label>
                    <input
                        type="text"
                        id="userId"
                        name="userId"
                        value={booking.userId}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="roomId">Room ID:</label>
                    <input
                        type="text"
                        id="roomId"
                        name="roomId"
                        value={booking.roomId}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="checkInDate">Check-in Date:</label>
                    <input
                        type="date"
                        id="checkInDate"
                        name="checkInDate"
                        value={booking.checkInDate}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="checkOutDate">Check-out Date:</label>
                    <input
                        type="date"
                        id="checkOutDate"
                        name="checkOutDate"
                        value={booking.checkOutDate}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="totalAmount">Total Amount:</label>
                    <input
                        type="number"
                        id="totalAmount"
                        name="totalAmount"
                        value={booking.totalAmount}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit">{id ? 'Update' : 'Create'} Booking</button>
            </form>
        </div>
    );
};

export default BookingForm;
