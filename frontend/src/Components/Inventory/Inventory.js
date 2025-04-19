import React, { useState, useEffect, useRef } from "react"; // Import useRef
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Inventory.css";
import { useReactToPrint } from "react-to-print";

function Inventory() {
  const [inventory, setInventory] = useState([]);
  const history = useNavigate();
  const ComponentsRef = useRef(); // Define useRef

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

  // Get PDF
  const handlePrint = useReactToPrint({
    content: () => ComponentsRef.current,
    documentTitle: "Inventory Report",
    onAfterPrint: () => alert("Inventory Report Successfully Downloaded!"),
  });

  return (
    <div className="inventory-container">
      <div ref={ComponentsRef}>
      <h1>Inventory List</h1>
      <table className="inventory-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Quantity</th>
            <th>Unit</th>
            <th>Price Per Unit</th>
            <th>Total</th> {/* New Total column */}
            <th>Supplier</th>
            <th>Last Updated</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          
            {inventory.map((item) => (
              <tr key={item._id}>
                <td>{item.name}</td>
                <td>{item.quantity}</td>
                <td>{item.unit}</td>
                <td>Rs.{item.pricePerUnit}</td>
                <td>Rs.{(item.quantity * item.pricePerUnit).toFixed(2)}</td>{" "}
                {/* Calculate and display total */}
                <td>{item.supplier}</td>
                <td>{new Date(item.lastUpdated).toLocaleDateString()}</td>
                <td>
                  <button onClick={() => history(`/updateinventory/${item._id}`)}>
                    Update
                  </button>
                  <button onClick={() => handleDelete(item._id)}>Delete</button>
                </td>
              </tr>
            ))}
          
        </tbody>
      </table>
      </div>
      <button onClick={() => window.print()} className="download-button">Download Report</button>
    </div>
  );
}

export default Inventory;