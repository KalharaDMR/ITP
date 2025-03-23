// App.js
import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import Home from "./Components/Home/Home";
import AddRoom from "./Components/AddRoom/AddRoom";
import Rooms from "./Components/RoomDetails/Rooms";
import UpdateRoom from "./Components/UpdateRoom/UpdateRoom";
import Register from "./Components/Register/Register";
import Signin from "./Components/Signin/Signin";
import Payment from "./Components/Payment/Payment";
import PaymentGateway from "./Components/Payment/PaymentGateway"; // Import the new component
import SafariTypes from "./Components/SafariTypes/SafariTypes";
import Nav from "./Components/Nav/Nav";

function App() {
  const location = useLocation();
  const showNav = !["/", "/mainhome"].includes(location.pathname);

  return (
    <div>
      {showNav && <Nav />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/mainhome" element={<Home />} />
        <Route path="/addroom" element={<AddRoom />} />
        <Route path="/roomdetails" element={<Rooms />} />
        <Route path="/register" element={<Register />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/update/:id" element={<UpdateRoom />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/paymentgateway" element={<PaymentGateway />} />
        <Route path="/safaritypes" element={<SafariTypes />} />
      </Routes>
    </div>
  );
}

export default App;