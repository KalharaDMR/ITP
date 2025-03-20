// Model/MenuModel.js
const mongoose = require("mongoose");

const menuSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  category: {
    type: String,
    required: true,
    enum: ["Juice", "Dessert", "Dish"], // Categories
  },
  ingredients: {
    type: [String], // Array of ingredients
    required: true,
  },
  image: {
    type: String, // URL of the uploaded image
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Menu", menuSchema);