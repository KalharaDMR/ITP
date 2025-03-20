// Route/OrderRoutes.js
const express = require("express");
const router = express.Router();
const OrderController = require("../Controllers/OrderController");

// Place a new order
router.post("/", OrderController.placeOrder);

// Get all orders
router.get("/", OrderController.getAllOrders);

router.put("/:id/status", OrderController.updateOrderStatus);
router.get("/by-username", OrderController.getOrdersByUsername);

module.exports = router;