import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import "./UpdateInventory.css";

function UpdateInventory() {
  const { id } = useParams();
  const history = useNavigate();
  const [inputs, setInputs] = useState({
    name: "",
    quantity: "",
    unit: "",
    pricePerUnit: "",
    supplier: "",
  });

  useEffect(() => {
    const fetchInventoryItem = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/inventory/${id}`);
        setInputs(res.data.inventory);
      } catch (err) {
        console.error("Error fetching inventory item:", err);
      }
    };
    fetchInventoryItem();
  }, [id]);

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/inventory/${id}`, inputs);
      history("/inventory");
    } catch (err) {
      console.error("Error updating inventory item:", err);
    }
  };

  return (
    <div className="update-inventory-container">
      <h1>Update Inventory Item</h1>
      <form onSubmit={handleSubmit}>
        <label>Name</label>
        <input
          type="text"
          name="name"
          value={inputs.name}
          onChange={handleChange}
          required
        />
        <label>Quantity</label>
        <input
          type="number"
          name="quantity"
          value={inputs.quantity}
          onChange={handleChange}
          required
        />
        <label>Unit</label>
        <input
          type="text"
          name="unit"
          value={inputs.unit}
          onChange={handleChange}
          required
        />
        <label>Price Per Unit</label>
        <input
          type="number"
          name="pricePerUnit"
          value={inputs.pricePerUnit}
          onChange={handleChange}
          required
        />
        <label>Supplier</label>
        <input
          type="text"
          name="supplier"
          value={inputs.supplier}
          onChange={handleChange}
        />
        <button type="submit">Update</button>
      </form>
    </div>
  );
}

export default UpdateInventory;