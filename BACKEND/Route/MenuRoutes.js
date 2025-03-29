// Route/MenuRoutes.js
const express = require("express");
const router = express.Router();
const MenuController = require("../Controllers/MenuController");

// Add a new menu item
router.post("/", MenuController.addMenuItem);

// Get all menu items
router.get("/", MenuController.getAllMenuItems);

// Get menu items by category
router.get("/category/:category", MenuController.getMenuItemsByCategory);

// Update a menu item
router.put("/:id", MenuController.updateMenuItem);

// Delete a menu item
router.delete("/:id", MenuController.deleteMenuItem);

module.exports = router;