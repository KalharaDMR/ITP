/*import React from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./Components/Home/Home";
import AddRoom from "./Components/AddRoom/AddRoom";
import Rooms from "./Components/RoomDetails/Rooms";
import UpdateRoom from "./Components/UpdateRoom/UpdateRoom"; // Import UpdateRoom
import Nav from "./Components/Nav/Nav";

function App() {
  return (
    <div>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/mainhome" element={<Home />} />
        <Route path="/addroom" element={<AddRoom />} />
        <Route path="/roomdetails" element={<Rooms />} />
        <Route path="/update/:id" element={<UpdateRoom />} /> //Route for updating a booking 
      </Routes>
    </div>
  );
}

export default App;*/

import React from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./Components/Home/Home";
import AddRoom from "./Components/AddRoom/AddRoom";
import Rooms from "./Components/RoomDetails/Rooms";
import UpdateRoom from "./Components/UpdateRoom/UpdateRoom";
import Register from "./Components/Register/Register";
import Payment from "./Components/Payment/Payment"; // Import Payment component
import Nav from "./Components/Nav/Nav";

function App() {
  return (
    <div>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/mainhome" element={<Home />} />
        <Route path="/addroom" element={<AddRoom />} />
        <Route path="/roomdetails" element={<Rooms />} />
        <Route path="/regi" element={<Register />} />
        <Route path="/update/:id" element={<UpdateRoom />} />
        <Route path="/payment" element={<Payment />} /> {/* Add Payment route */}
      </Routes>
    </div>
  );
}

export default App;