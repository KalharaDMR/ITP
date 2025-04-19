import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Menu.css";

function Menu() {
  const [menuItems, setMenuItems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const history = useNavigate();

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
    history(`/updatemenuitem/${id}`); // Navigate to the update page
  };

  const filteredMenuItems = selectedCategory === "All"
    ? menuItems
    : menuItems.filter((item) => item.category === selectedCategory);

  return (
    <div className="menu-container">
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
            <img src={item.image} alt={item.name} width="200" />
            <h3>{item.name}</h3>
            <p>{item.description}</p>
            <p>Price: Rs.{item.price}</p>
            <p>Ingredients: {item.ingredients.join(", ")}</p>
            <button onClick={() => handleDelete(item._id)}>Remove</button>
            <button onClick={() => handleUpdate(item._id)}>Update</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Menu;