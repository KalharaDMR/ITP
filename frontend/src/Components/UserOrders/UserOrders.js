import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import "./UserOrders.css";

function UserOrders() {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");

  const applyDateFilter = useCallback(() => {
    if (!selectedDate) {
      setFilteredOrders(orders);
      return;
    }

    const filtered = orders.filter(order => {
      const orderDate = new Date(order.createdAt);
      const selected = new Date(selectedDate);
      return (
        orderDate.getFullYear() === selected.getFullYear() &&
        orderDate.getMonth() === selected.getMonth() &&
        orderDate.getDate() === selected.getDate()
      );
    });

    setFilteredOrders(filtered);
  }, [orders, selectedDate]);

  useEffect(() => {
    fetchOrders();
  }, []);

  useEffect(() => {
    applyDateFilter();
  }, [applyDateFilter]);

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
      fetchOrders();
    } catch (err) {
      console.error("Error updating order status:", err);
    }
  };

  const generatePDFReport = () => {
    const doc = new jsPDF();

    doc.setFontSize(22);
    doc.setTextColor(40, 180, 100);
    doc.text("ORDERS REPORT", 105, 20, { align: 'center' });

    doc.setFontSize(10);
    doc.setTextColor(100, 100, 100);
    doc.text(`Generated on: ${new Date().toLocaleString()}`, 105, 30, { align: 'center' });

    if (selectedDate) {
      doc.text(`Date: ${new Date(selectedDate).toLocaleDateString()}`, 105, 35, { align: 'center' });
    }

    doc.setDrawColor(200, 200, 200);
    doc.line(10, selectedDate ? 40 : 35, 200, selectedDate ? 40 : 35);

    const totalOrders = filteredOrders.length;
    const totalIncome = filteredOrders.reduce((sum, order) => sum + (order.totalAmount || 0), 0);

    const tableData = filteredOrders.map(order => [
      order.username || 'N/A',
      order.tableNo || 'N/A',
      order.menuItemId?.name || 'N/A',
      order.quantity || '0',
      `Rs.${order.totalAmount || '0'}`,
      new Date(order.createdAt).toLocaleDateString() || 'N/A',
    ]);

    autoTable(doc, {
      head: [['Username', 'Table', 'Food Item', 'Qty', 'Amount', 'Date']],
      body: tableData,
      startY: selectedDate ? 45 : 40,
      theme: 'grid',
      headStyles: {
        fillColor: [40, 180, 100],
        textColor: 255,
        fontStyle: 'bold'
      },
      alternateRowStyles: {
        fillColor: [240, 240, 240]
      },
      columnStyles: {
        2: { cellWidth: 40 },
        5: { cellWidth: 25 }
      },
      didParseCell: function (data) {
        if (data.section === 'body') {
          const today = new Date();
          const orderDateParts = data.row.raw[5]?.split('/');
          if (orderDateParts && orderDateParts.length === 3) {
            const orderDate = new Date(`${orderDateParts[2]}-${orderDateParts[1]}-${orderDateParts[0]}`);
            if (
              orderDate.getFullYear() === today.getFullYear() &&
              orderDate.getMonth() === today.getMonth() &&
              orderDate.getDate() === today.getDate()
            ) {
              data.cell.styles.fillColor = [255, 255, 200]; // light yellow background
            }
          }
        }
      },
      didDrawPage: function (data) {
        if (data.pageCount === data.pageNumber) {
          doc.setFontSize(12);
          doc.setTextColor(0, 0, 0);
          doc.setFont(undefined, 'bold');
          const finalY = data.cursor.y + 15;
          doc.text(`Total Orders: ${totalOrders}`, 14, finalY);
          doc.text(`Total Income: Rs.${totalIncome.toFixed(2)}`, 14, finalY + 10);
        }
      }
    });
    
    doc.save(`orders_report_${selectedDate || 'all'}.pdf`);
  };

  return (
    <div className="user-orders-container">
      <div className="header-section">
        <h1>User Orders</h1>
        <div className="date-filter">
          <div className="date-input">
            <label>Date:</label>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
            />
          </div>
          <button onClick={generatePDFReport} className="pdf-button">
            Generate PDF Report
          </button>
        </div>
      </div>
      <div className="orders-list">
        {filteredOrders.map((order) => (
          <div key={order._id} className="order-item">
            <h3>Username: {order.username}</h3>
            <p>Table Number: {order.tableNo}</p>
            <p>Food Item: {order.menuItemId?.name || 'N/A'}</p>
            <p>Quantity: {order.quantity}</p>
            <p>Special Instructions: {order.specialInstructions || "None"}</p>
            <p>Total Amount: Rs.{order.totalAmount}</p>
            <p>Status: {order.status || "Pending"}</p>
            <p>Date: {new Date(order.createdAt).toLocaleString()}</p>
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
