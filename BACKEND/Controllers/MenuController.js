// Controllers/MenuController.js
const Menu = require("../Model/MenuModel");

// Add a new menu item
const addMenuItem = async (req, res, next) => {
  const { name, description, price, category, ingredients, image } = req.body;

  try {
    const menuItem = new Menu({
      name,
      description,
      price,
      category,
      ingredients,
      image,
    });
    await menuItem.save();
    res.status(201).json({ menuItem });
  } catch (err) {
    console.error("Error adding menu item:", err);
    res.status(500).json({ message: "Error adding menu item" });
  }
};

// Get all menu items
const getAllMenuItems = async (req, res, next) => {
  try {
    const menuItems = await Menu.find();
    res.status(200).json({ menuItems });
  } catch (err) {
    console.error("Error fetching menu items:", err);
    res.status(500).json({ message: "Error fetching menu items" });
  }
};

// Get menu items by category
const getMenuItemsByCategory = async (req, res, next) => {
  const { category } = req.params;

  try {
    const menuItems = await Menu.find({ category });
    res.status(200).json({ menuItems });
  } catch (err) {
    console.error("Error fetching menu items by category:", err);
    res.status(500).json({ message: "Error fetching menu items by category" });
  }
};

// Update a menu item
const updateMenuItem = async (req, res, next) => {
  const { id } = req.params;
  const { name, description, price, category, ingredients, image } = req.body;

  try {
    const updatedMenuItem = await Menu.findByIdAndUpdate(
      id,
      { name, description, price, category, ingredients, image },
      { new: true }
    );
    res.status(200).json({ updatedMenuItem });
  } catch (err) {
    console.error("Error updating menu item:", err);
    res.status(500).json({ message: "Error updating menu item" });
  }
};

// Delete a menu item
const deleteMenuItem = async (req, res, next) => {
  const { id } = req.params;

  try {
    await Menu.findByIdAndDelete(id);
    res.status(200).json({ message: "Menu item deleted successfully" });
  } catch (err) {
    console.error("Error deleting menu item:", err);
    res.status(500).json({ message: "Error deleting menu item" });
  }
};

module.exports = {
  addMenuItem,
  getAllMenuItems,
  getMenuItemsByCategory,
  updateMenuItem,
  deleteMenuItem,
};