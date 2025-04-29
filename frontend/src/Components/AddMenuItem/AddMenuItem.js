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
    category: "Dish",
    ingredients: "",
    image: "",
    imagePreview: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Prevent '@' character
    if (value.includes("@")) {
      return;
    }

    setInputs((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Please select a valid image file.");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert("Image size must be less than 5MB");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setInputs((prev) => ({
        ...prev,
        image: reader.result, // base64
        imagePreview: reader.result,
      }));
    };
    reader.readAsDataURL(file);
  };

  const validateForm = () => {
    const newErrors = {};

    if (!inputs.name || inputs.name.length < 2) {
      newErrors.name = "Item name must be at least 2 characters.";
    }

    if (!inputs.category) {
      newErrors.category = "Category is required.";
    }

    if (!inputs.price || isNaN(inputs.price) || inputs.price <= 0) {
      newErrors.price = "Price must be a positive number.";
    }

    if (!inputs.image) {
      newErrors.image = "Image is required.";
    }

    if (!inputs.description) {
      newErrors.description = "Description is required.";
    }

    if (!inputs.ingredients) {
      newErrors.ingredients = "Ingredients are required.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const payload = {
      name: inputs.name,
      description: inputs.description,
      price: Number(inputs.price),
      category: inputs.category,
      ingredients: inputs.ingredients.split(",").map(item => item.trim()),
      image: inputs.image,
    };

    try {
      await axios.post("http://localhost:5000/menu", payload);
      alert("Menu item added successfully!");
      history("/menu");
    } catch (err) {
      console.error("Error adding menu item:", err);
      alert("Failed to add menu item. Please try again.");
    }
  };

  return (
    <div className="add-menu-item-container">
      <h1>Add New Menu Item</h1>
      {errors.submit && <p className="error">{errors.submit}</p>}
      <form onSubmit={handleSubmit} className="form-grid">
        <div className="form-row">
          <div className="form-group">
            <label>Item Name</label>
            <input
              type="text"
              name="name"
              value={inputs.name}
              onChange={handleChange}
              placeholder="Enter item name"
            />
            {errors.name && <p className="error">{errors.name}</p>}
          </div>

          <div className="form-group">
            <label>Category</label>
            <select
              name="category"
              value={inputs.category}
              onChange={handleChange}
            >
              <option value="Dish">Main Dish</option>
              <option value="Dessert">Dessert</option>
              <option value="Juice">Juice</option>
            </select>
            {errors.category && <p className="error">{errors.category}</p>}
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Price (Rs)</label>
            <input
              type="number"
              name="price"
              value={inputs.price}
              onChange={handleChange}
              placeholder="0.00"
              step="0.01"
              min="0"
            />
            {errors.price && <p className="error">{errors.price}</p>}
          </div>

          <div className="form-group">
            <label>Menu Image (max 5MB)</label>
            <input
              type="file"
              name="menuImage"
              accept="image/*"
              onChange={handleImageChange}
            />
            {errors.image && <p className="error">{errors.image}</p>}
            {inputs.imagePreview && (
              <div className="image-preview">
                <img
                  src={inputs.imagePreview}
                  alt="Menu Preview"
                  style={{ maxWidth: "100%", maxHeight: "200px", marginTop: "10px" }}
                />
              </div>
            )}
          </div>
        </div>

        <div className="form-group full-width">
          <label>Description</label>
          <textarea
            name="description"
            value={inputs.description}
            onChange={handleChange}
            placeholder="Enter detailed description"
          />
          {errors.description && <p className="error">{errors.description}</p>}
        </div>

        <div className="form-group full-width">
          <label>Ingredients (comma separated)</label>
          <input
            type="text"
            name="ingredients"
            value={inputs.ingredients}
            onChange={handleChange}
            placeholder="e.g., Tomato, Cheese, Basil"
          />
          {errors.ingredients && <p className="error">{errors.ingredients}</p>}
        </div>

        <div className="form-group full-width">
          <button type="submit">Add to Menu</button>
        </div>
      </form>
    </div>
  );
}

export default AddMenuItem;