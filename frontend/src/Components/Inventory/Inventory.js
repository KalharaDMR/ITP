import React, { useState, useEffect, useRef, useCallback } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Inventory.css";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";

function Inventory() {
  const [inventory, setInventory] = useState([]);
  const [filteredInventory, setFilteredInventory] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [noResults, setNoResults] = useState(false);
  const [lowStockItems, setLowStockItems] = useState([]);
  const lowStockThreshold = 5; // Customize the threshold here
  const history = useNavigate();
  const componentsRef = useRef();

  useEffect(() => {
    fetchInventory();
  }, []);

  const applyDateFilter = useCallback(() => {
    if (!selectedDate) {
      setFilteredInventory(inventory);
      return;
    }

    const filtered = inventory.filter(item => {
      const itemDate = new Date(item.lastUpdated);
      const selected = new Date(selectedDate);
      return (
        itemDate.getFullYear() === selected.getFullYear() &&
        itemDate.getMonth() === selected.getMonth() &&
        itemDate.getDate() === selected.getDate()
      );
    });

    setFilteredInventory(filtered);
    setNoResults(filtered.length === 0);
  }, [inventory, selectedDate]);

  useEffect(() => {
    applyDateFilter();
  }, [applyDateFilter]);

  const fetchInventory = async () => {
    try {
      const res = await axios.get("http://localhost:5000/inventory");
      setInventory(res.data.inventory);

      // Check for low stock items
      const lowStock = res.data.inventory.filter(item => item.quantity <= lowStockThreshold);
      setLowStockItems(lowStock);

    } catch (err) {
      console.error("Error fetching inventory:", err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/inventory/${id}`);
      fetchInventory();
    } catch (err) {
      console.error("Error deleting inventory item:", err);
    }
  };

  const handleSearch = () => {
    if (!searchQuery.trim()) {
      applyDateFilter();
      setNoResults(false);
      return;
    }

    const searchedInventory = (selectedDate ? filteredInventory : inventory).filter((item) =>
      Object.values(item).some((field) =>
        field.toString().toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
    
    setFilteredInventory(searchedInventory);
    setNoResults(searchedInventory.length === 0);
  };

  const handleSendReport = () => {
    const phoneNumber = "+94768417047";
    const message = 'Inventory Report';
    const whatsappUrl = `https://web.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
  };

  const generatePDFReport = () => {
    const dataToExport = selectedDate ? filteredInventory : inventory;
    
    if (dataToExport.length === 0) {
      alert("No inventory items to generate report");
      return;
    }

    const doc = new jsPDF();
    
    // Report title
    doc.setFontSize(22);
    doc.setTextColor(40, 100, 180);
    doc.text("INVENTORY REPORT", 105, 20, { align: 'center' });
    
    // Report metadata
    doc.setFontSize(10);
    doc.setTextColor(100, 100, 100);
    doc.text(`Generated on: ${new Date().toLocaleString()}`, 105, 30, { align: 'center' });
    
    if (selectedDate) {
      doc.text(`Date: ${new Date(selectedDate).toLocaleDateString()}`, 105, 35, { align: 'center' });
    }
    
    // Divider line
    doc.setDrawColor(200, 200, 200);
    doc.line(10, selectedDate ? 40 : 35, 200, selectedDate ? 40 : 35);
    
    // Calculate totals
    const totalItems = dataToExport.length;
    const totalValue = dataToExport.reduce((sum, item) => sum + (item.quantity * item.pricePerUnit), 0);
    
    // Table data
    const tableData = dataToExport.map(item => [
      item.name,
      item.quantity,
      item.unit,
      `Rs.${item.pricePerUnit.toFixed(2)}`,
      `Rs.${(item.quantity * item.pricePerUnit).toFixed(2)}`,
      item.supplier,
      new Date(item.lastUpdated).toLocaleDateString()
    ]);
    
    // Generate table
    autoTable(doc, {
      head: [['Name', 'Qty', 'Unit', 'Unit Price', 'Total', 'Supplier', 'Last Updated']],
      body: tableData,
      startY: selectedDate ? 45 : 40,
      theme: 'grid',
      headStyles: {
        fillColor: [40, 100, 180],
        textColor: 255,
        fontStyle: 'bold'
      },
      columnStyles: {
        0: { cellWidth: 30 },
        1: { cellWidth: 15 },
        2: { cellWidth: 15 },
        3: { cellWidth: 20 },
        4: { cellWidth: 20 },
        5: { cellWidth: 30 },
        6: { cellWidth: 25 }
      },
      alternateRowStyles: {
        fillColor: [240, 240, 240]
      },
      didDrawPage: function (data) {
        if (data.pageCount === data.pageNumber) {
          doc.setFontSize(12);
          doc.setTextColor(0, 0, 0);
          doc.setFont(undefined, 'bold');
          const finalY = data.cursor.y + 15;
          doc.text(`Total Items: ${totalItems}`, 14, finalY);
          doc.text(`Total Inventory Value: Rs.${totalValue.toFixed(2)}`, 14, finalY + 10);
        }
      }
    });
    
    // Save the PDF
    doc.save(`inventory_report_${selectedDate || 'all'}.pdf`);
  };

  return (
    <div className="inventory-container">
      <div className="search-container">
        <input
          onChange={(e) => setSearchQuery(e.target.value)}
          type="text"
          name="search"
          placeholder="Search Inventory Details"
        />
        <button onClick={handleSearch}>Search</button>
        <div className="date-filter">
          <label>Filter by Date:</label>
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
          />
        </div>
      </div>

      {/* Low Stock Alert Section */}
      {lowStockItems.length > 0 && (
        <div className="low-stock-alert">
          <h2>⚠️ Low Stock Alert</h2>
          <ul>
            {lowStockItems.map((item) => (
              <li key={item._id}>
                {item.name} — Only {item.quantity} {item.unit} left!
              </li>
            ))}
          </ul>
        </div>
      )}

      {noResults ? (
        <div>
          <p>No Inventory items found</p>
        </div>
      ) : (
        <div ref={componentsRef}>
          <h1>Inventory List</h1>
          <table className="inventory-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Quantity</th>
                <th>Unit</th>
                <th>Price Per Unit</th>
                <th>Total</th>
                <th>Supplier</th>
                <th>Last Updated</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {(selectedDate || searchQuery ? filteredInventory : inventory).map((item) => (
                <tr key={item._id} className={item.quantity <= lowStockThreshold ? "low-stock-row" : ""}>
                  <td>{item.name}</td>
                  <td>{item.quantity}</td>
                  <td>{item.unit}</td>
                  <td>Rs.{item.pricePerUnit}</td>
                  <td>Rs.{(item.quantity * item.pricePerUnit).toFixed(2)}</td>
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
      )}
      
      <div className="action-buttons">
        <button onClick={generatePDFReport} className="download-button">
          Download Report
        </button>
        <button onClick={handleSendReport}>Send WhatsApp Message</button>
      </div>
    </div>
  );
}

export default Inventory;
