import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./AddInventory.css";

function AddInventory() {
  const history = useNavigate();
  const [inputs, setInputs] = useState({
    name: "",
    quantity: "",
    unit: "",
    pricePerUnit: "",
    supplier: "",
  });

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:5000/inventory", inputs);
    history("/inventory");
  };

  return (
    <div className="add-inventory-container">
      <h1>Add Inventory Item</h1>
      <form onSubmit={handleSubmit}>
        <label>Name</label>
        <input type="text" name="name" onChange={handleChange} required />
        <label>Quantity</label>
        <input type="number" name="quantity" onChange={handleChange} required />
        <label>Unit</label>
        <input type="text" name="unit" onChange={handleChange} required />
        <label>Price Per Unit</label>
        <input type="number" name="pricePerUnit" onChange={handleChange} required />
        <label>Supplier</label>
        <input type="text" name="supplier" onChange={handleChange} />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default AddInventory;