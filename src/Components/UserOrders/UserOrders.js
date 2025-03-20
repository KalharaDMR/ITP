import React, { useState, useEffect } from "react";
import axios from "axios";
import "./UserOrders.css";

function UserOrders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await axios.get("http://localhost:5000/orders");
      setOrders(res.data.orders);
    } catch (err) {
      console.error("Error fetching orders:", err);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      await axios.put(`http://localhost:5000/orders/${id}/status`, { status });
      fetchOrders(); // Refresh the orders list
    } catch (err) {
      console.error("Error updating order status:", err);
    }
  };

  return (
    <div className="user-orders-container">
      <h1>User Orders</h1>
      <div className="orders-list">
        {orders.map((order) => (
          <div key={order._id} className="order-item">
            <h3>Username: {order.username}</h3>
            <p>Table Number: {order.tableNo}</p>
            <p>Quantity: {order.quantity}</p>
            <p>Special Instructions: {order.specialInstructions || "None"}</p>
            <p>Total Amount: Rs.{order.totalAmount}</p>
            <p>Status: {order.status || "Pending"}</p>
            <div className="status-buttons">
              <button
                onClick={() => updateStatus(order._id, "Preparing")}
                disabled={order.status !== "Pending"}
              >
                Start Preparing
              </button>
              <button
                onClick={() => updateStatus(order._id, "Ready")}
                disabled={order.status !== "Preparing"}
              >
                Mark as Ready
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default UserOrders;