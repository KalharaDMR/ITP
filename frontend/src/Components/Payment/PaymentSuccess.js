// PaymentSuccess.js
import React from "react";
import { useLocation } from "react-router-dom";
import jsPDF from "jspdf";
import "./PaymentSuccess.css";

function PaymentSuccess() {
  const location = useLocation();
  const { FirstName, LastName, SafariType, NoOfAdults, NoOfKids, totalCost } = location.state;

  // Function to generate and download PDF
  const downloadReceipt = () => {
    const doc = new jsPDF();

    // Add content to the PDF
    doc.setFontSize(18);
    doc.text("Payment Receipt", 10, 20);
    doc.setFontSize(12);
    doc.text(`Name: ${FirstName} ${LastName}`, 10, 40);
    doc.text(`Safari Type: ${SafariType}`, 10, 50);
    doc.text(`Number of Adults: ${NoOfAdults}`, 10, 60);
    doc.text(`Number of Kids: ${NoOfKids}`, 10, 70);
    doc.text(`Total Cost: LKR ${totalCost}`, 10, 80);

    // Save the PDF
    doc.save("payment_receipt.pdf");
  };

  return (
    <div className="payment-success-container">
      <h1 className="payment-success-title">Payment Successful! 🎉</h1>
      <div className="payment-details">
        <p><strong>Name:</strong> {FirstName} {LastName}</p>
        <p><strong>Safari Type:</strong> {SafariType}</p>
        <p><strong>Number of Adults:</strong> {NoOfAdults}</p>
        <p><strong>Number of Kids:</strong> {NoOfKids}</p>
        <p><strong>Total Cost:</strong> LKR {totalCost}</p>
      </div>
      <button onClick={downloadReceipt} className="download-receipt-button">
        Download Receipt
      </button>
    </div>
  );
}

export default PaymentSuccess;