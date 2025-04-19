import React, { useState } from "react";
import axios from "axios";
import "./CustomerBill.css";

function CustomerBill() {
  const [username, setUsername] = useState("");
  const [orders, setOrders] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.get(`http://localhost:5000/orders/by-username?username=${username}`);
      if (res.data.orders.length === 0) {
        setError("No orders found for this username.");
        setOrders([]);
        setTotalAmount(0);
      } else {
        setOrders(res.data.orders);
        const total = res.data.orders.reduce((sum, order) => sum + order.totalAmount, 0);
        setTotalAmount(total);
        setError("");
      }
    } catch (err) {
      console.error("Error fetching orders:", err);
      setError("Failed to fetch orders. Please try again.");
    }
  };

  return (
    <div className="customer-bill-container">
      <h1>Customer Bill</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Enter Username:
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </label>
        <button type="submit">Search</button>
      </form>

      {error && <p className="error">{error}</p>}

      {orders.length > 0 && (
        <div className="bill-details">
          <h2>Orders for {username}</h2>
          <div className="orders-list">
            {orders.map((order) => (
              <div key={order._id} className="order-item">
                <h3>Order ID: {order._id}</h3>
                <p>Table Number: {order.tableNo}</p>
                <p>Quantity: {order.quantity}</p>
                <p>Special Instructions: {order.specialInstructions || "None"}</p>
                <p>Total Amount: Rs.{order.totalAmount}</p>
                <p>Status: {order.status || "Pending"}</p>
              </div>
            ))}
          </div>
          <h3>Total Bill: Rs.{totalAmount}</h3>
        </div>
      )}
    </div>
  );
}

export default CustomerBill;