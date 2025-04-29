import React, { useState, useEffect } from "react";
import axios from "axios";
import "./UserMenu.css"; // Link to the CSS file for UserMenu

function UserMenu() {
  const [menuItems, setMenuItems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [orderForm, setOrderForm] = useState({
    menuItemId: "",
    username: "",
    quantity: 1,
    tableNo: "",
    specialInstructions: "",
  });
  const [showOrderForm, setShowOrderForm] = useState(false);

  useEffect(() => {
    fetchMenuItems();
  }, []);

  const fetchMenuItems = async () => {
    try {
      const res = await axios.get("http://localhost:5000/menu");
      setMenuItems(res.data.menuItems);
    } catch (err) {
      console.error("Error fetching menu items:", err);
    }
  };

  const handleOrderClick = (menuItemId) => {
    setOrderForm((prevState) => ({
      ...prevState,
      menuItemId,
    }));
    setShowOrderForm(true);
  };

  const handleOrderChange = (e) => {
    setOrderForm((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    // Prevent '@' character
    if (value.includes("@")) {
      return; // Stop updating if @ is found
    }
    setOrderForm((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleOrderSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/orders", orderForm);
      setShowOrderForm(false);
      alert(`Order placed successfully! Total Amount: Rs.${res.data.order.totalAmount}`);
    } catch (err) {
      console.error("Error placing order:", err);
    }
  };

  const filteredMenuItems = selectedCategory === "All"
    ? menuItems
    : menuItems.filter((item) => item.category === selectedCategory);

  return (
    <div className="user-menu-container">
      <h1>Today's Menu</h1>

      {/* Category Navigation Bar */}
      <div className="category-nav">
        <button onClick={() => setSelectedCategory("All")}>All</button>
        <button onClick={() => setSelectedCategory("Juice")}>Juice</button>
        <button onClick={() => setSelectedCategory("Dessert")}>Dessert</button>
        <button onClick={() => setSelectedCategory("Dish")}>Dish</button>
      </div>

      {/* Display Menu Items */}
      <div className="menu-items">
        {filteredMenuItems.map((item) => (
          <div key={item._id} className="menu-item">
            <img src={item.image} alt={item.name} />
            <h3>{item.name}</h3>
            <p>{item.description}</p>
            <p>Price: Rs.{item.price}</p>
            <p>Ingredients: {item.ingredients.join(", ")}</p>
            <button onClick={() => handleOrderClick(item._id)}>Order</button>
          </div>
        ))}
      </div>

      {/* Order Form */}
      {showOrderForm && (
        <div className="order-form-overlay">
          <div className="order-form">
            <h2>Place Order</h2>
            <form onSubmit={handleOrderSubmit}>
              <label>Username</label>
              <input
                type="text"
                name="username"
                value={orderForm.username}
                onChange={handleInputChange} // Apply input change handler
                required
              />
              <label>Quantity</label>
              <input
                type="number"
                name="quantity"
                value={orderForm.quantity}
                onChange={handleOrderChange}
                min="1"
                required
              />
              <label>Table Number</label>
              <input
                type="text"
                name="tableNo"
                value={orderForm.tableNo}
                onChange={handleOrderChange}
                required
              />
              <label>Special Instructions</label>
              <textarea
                name="specialInstructions"
                value={orderForm.specialInstructions}
                onChange={handleInputChange} // Apply input change handler
              />
              <button type="submit">Place Order</button>
              <button type="button" onClick={() => setShowOrderForm(false)}>Cancel</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default UserMenu;
