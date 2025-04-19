import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./AddMenuItem.css";

function AddMenuItem() {
  const history = useNavigate();
  const [inputs, setInputs] = useState({
    name: "",
    description: "",
    price: "",
    category: "Dish", // Default category
    ingredients: "",
    image: "",
  });

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/menu", inputs);
      history("/menu");
    } catch (err) {
      console.error("Error adding menu item:", err);
    }
  };

  return (
    <div className="add-menu-item-container">
      <h1>Add Menu Item</h1>
      <form onSubmit={handleSubmit}>
        <label>Name</label>
        <input type="text" name="name" onChange={handleChange} required />
        <label>Description</label>
        <textarea name="description" onChange={handleChange} required />
        <label>Price</label>
        <input type="number" name="price" onChange={handleChange} required />
        <label>Category</label>
        <select name="category" onChange={handleChange} required>
          <option value="Juice">Juice</option>
          <option value="Dessert">Dessert</option>
          <option value="Dish">Dish</option>
        </select>
        <label>Ingredients (comma-separated)</label>
        <input type="text" name="ingredients" onChange={handleChange} required />
        <label>Image</label>
        <input type="text" name="image" onChange={handleChange} required />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default AddMenuItem;