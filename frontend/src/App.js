// src/App.js
import React, { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import "./App.css";

import Home from "./Components/Home/Home";
import AddInventory from "./Components/AddInventory/AddInventory";
import Inventory from "./Components/Inventory/Inventory";
import UpdateInventory from "./Components/UpdateInventory/UpdateInventory";
import AddMenuItem from "./Components/AddMenuItem/AddMenuItem";
import Menu from "./Components/Menu/Menu";
import UserMenu from "./Components/UserMenu/UserMenu";
import UpdateMenuItem from "./Components/UpdateMenuItem/UpdateMenuItem";
import UserOrders from "./Components/UserOrders/UserOrders";
import CustomerBill from "./Components/CustomerBill/CustomerBill";
import Nav from "./Components/Nav/Nav";
import Login from "./Components/Login/Login"; // 👈 Add Login Page

function App() {
  // This is where we store login state (simple for now)
  const [userRole, setUserRole] = useState(""); // "staff" or "customer"

  return (
    <div className="App">
      {/* Pass userRole to Nav so it can show correct menus */}
      <Nav userRole={userRole} setUserRole={setUserRole} />

      <main className="main-content">
      <Routes>
  <Route 
    path="/" 
    element={userRole ? <Home /> : <Navigate to="/login" />} 
  />
  <Route path="/login" element={<Login setUserRole={setUserRole} />} />

  {userRole === "staff" && (
    <>
      <Route path="/addinventory" element={<AddInventory />} />
      <Route path="/inventory" element={<Inventory />} />
      <Route path="/updateinventory/:id" element={<UpdateInventory />} />
      <Route path="/addmenuitem" element={<AddMenuItem />} />
      <Route path="/menu" element={<Menu />} />
      <Route path="/updatemenuitem/:id" element={<UpdateMenuItem />} />
      <Route path="/userorders" element={<UserOrders />} />
      <Route path="/customerbill" element={<CustomerBill />} />
    </>
  )}

  {userRole === "customer" && (
    <>
      <Route path="/usermenu" element={<UserMenu />} />
      <Route path="/customerbill" element={<CustomerBill />} />
    </>
  )}

  {/* If no route matches */}
  <Route path="*" element={<Navigate to="/login" />} />
</Routes>

      </main>
    </div>
  );
}

export default App;
