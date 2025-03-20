import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Inventory.css";

function Inventory() {
  const [inventory, setInventory] = useState([]);
  const history = useNavigate();

  useEffect(() => {
    fetchInventory();
  }, []);

  const fetchInventory = async () => {
    try {
      const res = await axios.get("http://localhost:5000/inventory");
      setInventory(res.data.inventory);
    } catch (err) {
      console.error("Error fetching inventory:", err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/inventory/${id}`);
      fetchInventory(); // Refresh the inventory list after deletion
    } catch (err) {
      console.error("Error deleting inventory item:", err);
    }
  };

  return (
    <div className="inventory-container">
      <h1>Inventory List</h1>
      {inventory.map((item) => (
        <div key={item._id} className="inventory-item">
          <h2>{item.name}</h2>
          <p>Quantity: {item.quantity} {item.unit}</p>
          <p>Price Per Unit: ${item.pricePerUnit}</p>
          <p>Supplier: {item.supplier}</p>
          <button onClick={() => history(`/updateinventory/${item._id}`)}>
            Update
          </button>
          <button onClick={() => handleDelete(item._id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}

export default Inventory;