// src/Components/Menu/Menu.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Menu.css";

function Menu() {
  const [menuItems, setMenuItems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const navigate = useNavigate();

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

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/menu/${id}`);
      fetchMenuItems(); // Refresh the menu items after deletion
    } catch (err) {
      console.error("Error deleting menu item:", err);
    }
  };

  const handleUpdate = (id) => {
    navigate(`/updatemenuitem/${id}`);
  };

  const filteredMenuItems =
    selectedCategory === "All"
      ? menuItems
      : menuItems.filter((item) => item.category === selectedCategory);

  return (
    <div className="menu-container">
      <h1>Today's Menu 🍽️</h1>

      {/* Category Navigation */}
      <div className="category-nav">
        {["All", "Juice", "Dessert", "Dish"].map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={selectedCategory === category ? "active" : ""}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Menu Items */}
      <div className="menu-items">
        {filteredMenuItems.map((item) => (
          <div key={item._id} className="menu-item-card">
            <img src={item.image} alt={item.name} className="menu-image" />
            <h3>{item.name}</h3>
            <p className="description">{item.description}</p>
            <p className="price">Rs. {item.price}</p>
            <p className="ingredients">
              <strong>Ingredients:</strong> {item.ingredients.join(", ")}
            </p>
            <div className="button-group">
              <button className="btn remove" onClick={() => handleDelete(item._id)}>
                Remove
              </button>
              <button className="btn update" onClick={() => handleUpdate(item._id)}>
                Update
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Menu;
