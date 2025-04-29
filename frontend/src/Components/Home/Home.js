import React from "react";
import "./Home.css";

function Home() {
  return (
    <div className="home-container">
      <header className="home-header">
        <h1>🍽️ Welcome to Our Kitchen Management System!</h1>
        <p>Effortlessly manage inventory, organize the menu, and handle customer orders — all in one place.</p>
        <button className="cta-btn">Get Started</button>
      </header>

      {/* New Section with an interactive carousel */}
      <section className="home-intro">
        <div className="carousel-container">
          <img
            src="https://4.imimg.com/data4/OU/SJ/ANDROID-22980442/product-500x500.jpeg"
            alt="Kitchen"
            className="carousel-image"
          />
          <img
            src="https://d1csarkz8obe9u.cloudfront.net/posterpreviews/restaurant-menu-design-template-22ed5dc89be68d06ae5171599c95a1a9_screen.jpg?ts=1655454936"
            alt="Menu"
            className="carousel-image"
          />
          <img
            src="https://media.istockphoto.com/id/1131538033/photo/indian-chefs-cooking-in-a-professional-kitchen-of-a-gourmet-restaurant.jpg?s=612x612&w=0&k=20&c=uGMGXD3Qm6Gj0RzmaCEC3rCdR7P6b8Y9G9m-DIwgarI="
            alt="Cooking"
            className="carousel-image"
          />
        </div>
      </section>

      <section className="home-features">
        <div className="feature-card">
          <img
            src="https://www.crunchtime.com/hubfs/Imported_Blog_Media/Freezer20Restaurant20Cooler20Inventory-2.jpg"
            alt="Inventory"
          />
          <h2>Inventory Management</h2>
          <p>Track kitchen ingredients, update stocks, and maintain a well-stocked pantry effortlessly.</p>
        </div>

        <div className="feature-card">
          <img
            src="https://images.unsplash.com/photo-1556911220-bff31c812dba"
            alt="Menu"
          />
          <h2>Menu Management</h2>
          <p>Add and update delicious dishes to your menu, ensuring cost-based pricing for better profitability.</p>
        </div>

        <div className="feature-card">
          <img
            src="https://happay.com/blog/wp-content/uploads/sites/12/2023/05/billing.webp"
            alt="Billing"
          />
          <h2>Customer Billing</h2>
          <p>Generate bills quickly based on customer orders for smooth, efficient service.</p>
        </div>
      </section>

      {/* New Section: Stats/Real-time data */}
      <section className="home-stats">
        <div className="stat-card">
          <h3>Inventory Status</h3>
          <p>🛒 75% of ingredients are stocked.</p>
        </div>

        <div className="stat-card">
          <h3>Orders Today</h3>
          <p>🍴 120 orders processed so far.</p>
        </div>

        <div className="stat-card">
          <h3>Customer Feedback</h3>
          <p>⭐ 4.8/5 average rating based on 150 reviews.</p>
        </div>
      </section>

      {/* Customer reviews/testimonials */}
      <section className="home-reviews">
        <h2>What Our Users Say</h2>
        <div className="review-card">
          <p>"This system has streamlined our kitchen management! It's a lifesaver for organizing orders and managing inventory efficiently." – Chef Alex</p>
        </div>
        <div className="review-card">
          <p>"A must-have tool for any busy restaurant! The menu management and billing are spot-on." – Sarah, Restaurant Owner</p>
        </div>
      </section>
    </div>
  );
}

export default Home;
