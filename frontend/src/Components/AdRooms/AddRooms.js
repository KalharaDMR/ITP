import React, { useState } from 'react';
import Nav from "../Nav/Nav";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import './AddRooms.css';

function AddRoom() {
    const history = useNavigate();
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

    const handleChange = (e) => {
        setInputs((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(inputs);
        await sendRequest().then(() => history("/Roomdetails"));
    };

    const sendRequest = async () => {
        await axios.post("http://localhost:5000/Rooms/", {
            roomNumber: String(inputs.roomNumber),
            roomType: String(inputs.roomType),
            pricePerNight: Number(inputs.pricePerNight),
            features: String(inputs.features),
            capacity: String(inputs.capacity),
            status: String(inputs.status),
            description: String(inputs.description),
            imageUrl: String(inputs.imageUrl),
        }).then(res => res.data);
    }

    return (
        <div>
            <Nav />
            <div className="add-room-container">
                <h1>Add Room</h1>
                <form className="add-room-form" onSubmit={handleSubmit}>
                    <label>Room Number</label>
                    <br />
                    <input type="text" name="roomNumber" onChange={handleChange} value={inputs.roomNumber} required />
                    <br /><br />
                    <label>Room Type</label>
                    <br />
                    <input type="text" name="roomType" onChange={handleChange} value={inputs.roomType} required />
                    <br /><br />
                    <label>Price Per Night</label>
                    <br />
                    <input type="text" name="pricePerNight" onChange={handleChange} value={inputs.pricePerNight} required />
                    <br /><br />
                    <label>Features</label>
                    <br />
                    <input type="text" name="features" onChange={handleChange} value={inputs.features} required />
                    <br /><br />
                    <label>Capacity</label>
                    <br />
                    <input type="text" name="capacity" onChange={handleChange} value={inputs.capacity} required />
                    <br /><br />
                    <label>Status</label>
                    <br />
                    <input type="text" name="status" onChange={handleChange} value={inputs.status} required />
                    <br /><br />
                    <label>Description</label>
                    <br />
                    <input type="text" name="description" onChange={handleChange} value={inputs.description} required />
                    <br /><br />
                    <label>Image URL</label>
                    <br />
                    <input type="text" name="imageUrl" onChange={handleChange} value={inputs.imageUrl} required />
                    <br /><br />
                    <button type="submit">Submit</button>
                </form>
            </div>
        </div>
    );
}

export default AddRoom;