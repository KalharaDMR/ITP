import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import "./UpdateMenuItem.css";

function UpdateMenuItem() {
  const { id } = useParams(); // Get the menu item ID from the URL
  const history = useNavigate();
  const [inputs, setInputs] = useState({
    name: "",
    description: "",
    price: "",
    category: "Dish",
    ingredients: "",
    image: "",
  });

  useEffect(() => {
    const fetchMenuItem = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/menu/${id}`);
        setInputs(res.data.menuItem);
      } catch (err) {
        console.error("Error fetching menu item:", err);
      }
    };
    fetchMenuItem();
  }, [id]);

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send only the price to the backend for update
      await axios.put(`http://localhost:5000/menu/${id}`, { price: inputs.price });
      history("/menu");
    } catch (err) {
      console.error("Error updating menu item:", err);
    }
  };

  return (
    <div className="update-menu-item-container">
      <h1>Update Menu Item</h1>
      <form onSubmit={handleSubmit}>
        {/* Disabled Fields (Read-Only) */}
        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={inputs.name}
            readOnly // Make the field read-only
          />
        </div>
        <div className="form-group">
          <label>Description</label>
          <textarea
            name="description"
            value={inputs.description}
            readOnly // Make the field read-only
          />
        </div>
        <div className="form-group">
          <label>Category</label>
          <select
            name="category"
            value={inputs.category}
            disabled // Disable the field
          >
            <option value="Juice">Juice</option>
            <option value="Dessert">Dessert</option>
            <option value="Dish">Dish</option>
          </select>
        </div>
        <div className="form-group">
          <label>Ingredients (comma-separated)</label>
          <input
            type="text"
            name="ingredients"
            value={inputs.ingredients}
            readOnly // Make the field read-only
          />
        </div>
        <div className="form-group">
          <label>Image URL</label>
          <input
            type="text"
            name="image"
            value={inputs.image}
            readOnly // Make the field read-only
          />
        </div>

        {/* Editable Price Field */}
        <div className="form-group">
          <label>Price</label>
          <input
            type="number"
            name="price"
            value={inputs.price}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit">Update Price</button>
      </form>
    </div>
  );
}

export default UpdateMenuItem;