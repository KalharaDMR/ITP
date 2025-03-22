import React from "react";
import { Route, Routes, Navigate } from "react-router-dom"; // Import Navigate
import './App.css';
import Home from "./Components/Home/Home";
import AddRoom from "./Components/AdRooms/AddRooms";
import Room from "./Components/Room/Room";
import UpdateRooms from "./Components/UpdateRooms/UpdateRooms";
//import Nav from "./Components/Nav/Nav";

function App() {
  return (
    <div>
      
      <Routes>
        {/* Redirect root URL to /Roomdetails */}
        <Route path="/" element={<Navigate to="/Roomdetails" />} />
        <Route path="/mainhome" element={<Home />} />
        <Route path="/AddRooms" element={<AddRoom />} />
        <Route path="/Roomdetails" element={<Room />} />
        <Route path="/Roomdetails/:id" element={<UpdateRooms />} />
      </Routes>
    </div>
  );
}

export default App;