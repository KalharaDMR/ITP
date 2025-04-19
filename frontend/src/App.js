// src/App.js
import React from "react";
import { Routes, Route } from "react-router-dom";
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
/*import Header from "./Components/Header/Header";
import Footer from "./Components/Footer/Footer";*/
import Nav from "./Components/Nav/Nav";

function App() {
  return (
    <div className="App">
      
      <Nav />
      <main className="main-content">
      
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/addinventory" element={<AddInventory />} />
          <Route path="/inventory" element={<Inventory />} />
          <Route path="/updateinventory/:id" element={<UpdateInventory />} />
          <Route path="/addmenuitem" element={<AddMenuItem />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/usermenu" element={<UserMenu />} /> 
          <Route path="/updatemenuitem/:id" element={<UpdateMenuItem />} />
          <Route path="/userorders" element={<UserOrders />} />
          <Route path="/customerbill" element={<CustomerBill />} />
        </Routes>
      </main>
      
    </div>
  );
}

export default App;