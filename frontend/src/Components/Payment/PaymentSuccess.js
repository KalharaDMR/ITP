import React, { useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import jsPDF from "jspdf";
import { FaHome, FaFileDownload, FaCheckCircle } from "react-icons/fa";
import "./PaymentSuccess.css";

function PaymentSuccess() {
  const location = useLocation();
  const navigate = useNavigate();
  const { 
    FirstName, 
    LastName, 
    SafariType, 
    NoOfAdults, 
    NoOfKids, 
    EventType,
    GuestCount,
    totalCost,
    paymentType,
    paymentDate,
    transactionId,
    cardLastFour
  } = location.state || {};

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [isNavigating, setIsNavigating] = useState(false);

  // Function to generate and download PDF
  const downloadReceipt = () => {
    setIsDownloading(true);
    
    try {
      const doc = new jsPDF();
      
      // Add content to the PDF
      doc.setFontSize(18);
      doc.text("Payment Receipt", 10, 20);
      doc.setFontSize(12);
      doc.text(`Name: ${FirstName} ${LastName}`, 10, 40);
      
      if (paymentType === 'safari') {
        doc.text(`Safari Type: ${SafariType}`, 10, 50);
        doc.text(`Number of Adults: ${NoOfAdults}`, 10, 60);
        doc.text(`Number of Kids: ${NoOfKids}`, 10, 70);
      } else {
        doc.text(`Event Type: ${EventType}`, 10, 50);
        doc.text(`Number of Guests: ${GuestCount}`, 10, 60);
      }
      
      doc.text(`Total Cost: LKR ${totalCost}`, 10, 80);
      doc.text(`Transaction ID: ${transactionId}`, 10, 90);
      doc.text(`Payment Date: ${new Date(paymentDate).toLocaleString()}`, 10, 100);
      doc.text(`Payment Method: **** **** **** ${cardLastFour}`, 10, 110);
      
      // Save the PDF
      doc.save(`${paymentType}_receipt_${transactionId}.pdf`);
    } catch (error) {
      console.error("Error generating receipt:", error);
    } finally {
      setIsDownloading(false);
    }
  };

  const handleBackToHome = async () => {
    try {
      setIsNavigating(true);
      await new Promise(resolve => setTimeout(resolve, 500));
      navigate('/mainhome');
    } catch (error) {
      console.error("Navigation error:", error);
    } finally {
      setIsNavigating(false);
    }
  };

  return (
    <div className="payment-success-page">
      {/* Navigation Bar */}
      <nav className={`main-navbar ${isMenuOpen ? 'open' : ''}`}>
        <div className="logo">🌍 Nature's Lake View Hotel</div>
        
        <div className="hamburger" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          <div className="line"></div>
          <div className="line"></div>
          <div className="line"></div>
        </div>
        
        <ul className={`nav-links ${isMenuOpen ? 'open' : ''}`}>
          <li onClick={() => { window.scrollTo(0, 0); setIsMenuOpen(false); }}>Home</li>
          <li><a href="#about" onClick={() => setIsMenuOpen(false)}>Safari</a></li>
          <li><a href="#services" onClick={() => setIsMenuOpen(false)}>Events</a></li>
          <li><a href="#locations" onClick={() => setIsMenuOpen(false)}>About</a></li>
          <li><a href="#testimonials" onClick={() => setIsMenuOpen(false)}>My Bookings</a></li>
          <li><a href="#contact" onClick={() => setIsMenuOpen(false)}>Contact</a></li>
          <li>
            <Link to="/safari-home" className="signin-btn" onClick={() => setIsMenuOpen(false)}>
              Sign Out
            </Link>
          </li>
        </ul>
      </nav>

      <div className="payment-success-container">
        <div className="success-icon animate-check">
          <FaCheckCircle />
        </div>
        <h1 className="success-title animate-fade">Payment Successful!</h1>
        <p className="success-message animate-fade-delay">Your {paymentType} booking has been confirmed</p>
        
        <div className="receipt-container animate-slide-up">
          <h2>Booking Confirmation</h2>
          
          <div className="receipt-details">
            <div className="detail-row">
              <span className="detail-label">Transaction ID:</span>
              <span className="detail-value">{transactionId}</span>
            </div>
            <div className="detail-row">
              <span className="detail-label">Date:</span>
              <span className="detail-value">{new Date(paymentDate).toLocaleString()}</span>
            </div>
            <div className="detail-row">
              <span className="detail-label">Name:</span>
              <span className="detail-value">{FirstName} {LastName}</span>
            </div>
            
            {paymentType === 'safari' ? (
              <>
                <div className="detail-row">
                  <span className="detail-label">Safari Type:</span>
                  <span className="detail-value">{SafariType}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Participants:</span>
                  <span className="detail-value">{NoOfAdults} adults, {NoOfKids} children</span>
                </div>
              </>
            ) : (
              <>
                <div className="detail-row">
                  <span className="detail-label">Event Type:</span>
                  <span className="detail-value">{EventType}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Guests:</span>
                  <span className="detail-value">{GuestCount}</span>
                </div>
              </>
            )}
            
            <div className="detail-row total">
              <span className="detail-label">Total Paid:</span>
              <span className="detail-value">LKR {parseFloat(totalCost).toFixed(2)}</span>
            </div>
          </div>
        </div>
        
        <div className="action-buttons animate-slide-up-delay">
          <button 
            onClick={downloadReceipt} 
            className="download-button"
            disabled={isDownloading}
          >
            {isDownloading ? (
              <span className="loading-spinner"></span>
            ) : (
              <>
                <FaFileDownload /> Download Receipt
              </>
            )}
          </button>
          <button 
            onClick={handleBackToHome} 
            className="home-button"
            disabled={isNavigating}
          >
            {isNavigating ? (
              <span className="loading-spinner"></span>
            ) : (
              <>
                <FaHome /> Back to Home
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default PaymentSuccess;