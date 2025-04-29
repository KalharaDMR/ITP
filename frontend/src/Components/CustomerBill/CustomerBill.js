import React, { useState } from "react";
import axios from "axios";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import "./CustomerBill.css";

function CustomerBill() {
  const [username, setUsername] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [orders, setOrders] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username) return;

    try {
      const res = await axios.get(`http://localhost:5000/orders/by-username?username=${username}`);
      const allOrders = res.data.orders || [];
      let filteredOrders = allOrders;

      if (selectedDate) {
        const start = new Date(selectedDate);
        const end = new Date(selectedDate);
        end.setHours(23, 59, 59, 999);

        filteredOrders = allOrders.filter(order => {
          const orderDate = new Date(order.createdAt);
          return orderDate >= start && orderDate <= end;
        });
      }

      if (filteredOrders.length === 0) {
        setError("No orders found for this user on the selected date.");
        setOrders([]);
        setTotalAmount(0);
      } else {
        setOrders(filteredOrders);
        const total = filteredOrders.reduce((sum, order) => sum + (order.totalAmount || 0), 0);
        setTotalAmount(total);
        setError("");
      }

    } catch (err) {
      console.error("Error fetching orders:", err);
      setError("Failed to fetch orders. Please try again.");
    }
  };

  const generateBillPDF = () => {
    if (orders.length === 0) {
      setError("No orders to generate bill for");
      return;
    }

    const doc = new jsPDF();
    
    // Restaurant header
    doc.setFontSize(22);
    doc.setTextColor(40, 100, 180);
    doc.text("NATURES LAKE VIEW", 105, 20, { align: 'center' });
    
    doc.setFontSize(12);
    doc.setTextColor(100, 100, 100);
    doc.text("123 Restaurant Street, Dambulla", 105, 28, { align: 'center' });
    doc.text("Phone: (+94) 456-7890 | Email: natureslakeview@restaurant.com", 105, 34, { align: 'center' });
    
    // Bill title
    doc.setFontSize(18);
    doc.setTextColor(0, 0, 0);
    doc.text("CUSTOMER BILL", 105, 45, { align: 'center' });
    
    // Customer info
    doc.setFontSize(12);
    doc.text(`Customer: ${username}`, 14, 55);
    doc.text(`Date: ${selectedDate ? new Date(selectedDate).toLocaleDateString() : new Date().toLocaleDateString()}`, 14, 62);
    doc.text(`Bill No: ${orders[0]._id.slice(-6).toUpperCase()}`, 14, 69);
    
    // Horizontal line
    doc.setDrawColor(200, 200, 200);
    doc.line(10, 75, 200, 75);
    
    // Order items table with food details (without special instructions)
    const tableData = orders.map(order => [
      order.menuItemId?.name || 'N/A',
      order.quantity || '0',
      `Rs.${order.menuItemId?.price || '0'}`,
      `Rs.${order.totalAmount || '0'}`,
      new Date(order.createdAt).toLocaleTimeString()
    ]);
    
    autoTable(doc, {
      head: [['Item Name', 'Qty', 'Unit Price', 'Amount', 'Time']],
      body: tableData,
      startY: 80,
      theme: 'grid',
      headStyles: {
        fillColor: [40, 100, 180],
        textColor: 255,
        fontStyle: 'bold'
      },
      columnStyles: {
        0: { cellWidth: 60 }, // Wider column for item name
        1: { cellWidth: 15 },
        2: { cellWidth: 25 },
        3: { cellWidth: 25 },
        4: { cellWidth: 25 }
      },
      alternateRowStyles: {
        fillColor: [240, 240, 240]
      },
      styles: {
        fontSize: 10
      }
    });
    
    // Total amount
    const finalY = doc.lastAutoTable.finalY + 15;
    doc.setFontSize(14);
    doc.setFont(undefined, 'bold');
    doc.text(`Subtotal: Rs.${totalAmount.toFixed(2)}`, 140, finalY);
    
    const tax = totalAmount * 0.10;
    doc.text(`Tax (10%): Rs.${tax.toFixed(2)}`, 140, finalY + 8);
    
    const grandTotal = totalAmount + tax;
    doc.text(`Grand Total: Rs.${grandTotal.toFixed(2)}`, 140, finalY + 20);
    
    // Footer
    doc.setFontSize(10);
    doc.setTextColor(100, 100, 100);
    doc.text("Thank you for dining with us!", 105, finalY + 35, { align: 'center' });
    doc.text("Generated on: " + new Date().toLocaleString(), 105, finalY + 40, { align: 'center' });
    
    doc.save(`bill_${username}_${selectedDate || 'all'}.pdf`);
  };

  return (
    <div className="customer-bill-container">
      <h1>Customer Bill Generator</h1>
      
      <form className="search-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Customer Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter customer username"
            required
          />
        </div>
        
        <div className="form-group">
          <label>Select Date</label>
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            min={new Date().toISOString().split('T')[0]}
            max={new Date().toISOString().split('T')[0]}
            required
          />
        </div>
        
        <button type="submit" className="search-button">Search Orders</button>
      </form>

      {error && <div className="error-message">{error}</div>}

      {orders.length > 0 && (
        <div className="bill-details">
          <div className="bill-header">
            <h2 className="bill-title">
              Orders for {username} {selectedDate && `on ${new Date(selectedDate).toLocaleDateString()}`}
            </h2>
          </div>
          
          <div className="orders-grid">
            {orders.map((order) => (
              <div key={order._id} className="order-card">
                <h3 className="order-id">Order #{order._id.slice(-6).toUpperCase()}</h3>
                
                <div className="order-detail">
                  <span className="order-detail-label">Item:</span>
                  <span className="order-detail-value">{order.menuItemId?.name || 'N/A'}</span>
                </div>
                
                <div className="order-detail">
                  <span className="order-detail-label">Quantity:</span>
                  <span className="order-detail-value">{order.quantity}</span>
                </div>
                
                <div className="order-detail">
                  <span className="order-detail-label">Unit Price:</span>
                  <span className="order-detail-value">Rs.{order.menuItemId?.price || '0'}</span>
                </div>
                
                <div className="order-detail">
                  <span className="order-detail-label">Instructions:</span>
                  <span className="order-detail-value">{order.specialInstructions || "None"}</span>
                </div>
                
                <div className="order-detail">
                  <span className="order-detail-label">Status:</span>
                  <span className="order-detail-value">{order.status || "Pending"}</span>
                </div>
                
                <div className="order-detail">
                  <span className="order-detail-label">Time:</span>
                  <span className="order-detail-value">{new Date(order.createdAt).toLocaleTimeString()}</span>
                </div>
                
                <div className="order-detail">
                  <span className="order-detail-label">Amount:</span>
                  <span className="order-detail-value">Rs.{order.totalAmount}</span>
                </div>
              </div>
            ))}
          </div>
          
          <div className="total-section">
            <p className="total-amount">Total Bill: Rs.{totalAmount}</p>
          </div>
          
          <button onClick={generateBillPDF} className="pdf-button">
            Generate PDF Bill
          </button>
        </div>
      )}
    </div>
  );
}

export default CustomerBill;