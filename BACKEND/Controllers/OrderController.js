// Controllers/OrderController.js
const Order = require("../Model/OrderModel");
const Menu = require("../Model/MenuModel");

// Place a new order
const placeOrder = async (req, res, next) => {
  const { menuItemId, username, quantity, tableNo, specialInstructions } = req.body;

  try {
    // Fetch the menu item to get the price
    const menuItem = await Menu.findById(menuItemId);
    if (!menuItem) {
      return res.status(404).json({ message: "Menu item not found" });
    }

    // Calculate total amount
    const totalAmount = menuItem.price * quantity;

    // Create a new order
    const order = new Order({
      menuItemId,
      username,
      quantity,
      tableNo,
      specialInstructions,
      totalAmount,
    });
    await order.save();

    res.status(201).json({ order });
  } catch (err) {
    console.error("Error placing order:", err);
    res.status(500).json({ message: "Error placing order" });
  }
};

// Get all orders
const getAllOrders = async (req, res, next) => {
  try {
    const orders = await Order.find().populate("menuItemId");
    res.status(200).json({ orders });
  } catch (err) {
    console.error("Error fetching orders:", err);
    res.status(500).json({ message: "Error fetching orders" });
  }
};

const updateOrderStatus = async (req, res, next) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );
    res.status(200).json({ updatedOrder });
  } catch (err) {
    console.error("Error updating order status:", err);
    res.status(500).json({ message: "Error updating order status" });
  }
};

const getOrdersByUsername = async (req, res, next) => {
  const { username } = req.query;
  console.log("Fetching orders for username:", username); // Debugging
  try {
    const orders = await Order.find({ username: { $regex: new RegExp(username, "i") } }).populate("menuItemId");
    if (orders.length === 0) {
      return res.status(404).json({ message: "No orders found for this username." });
    }
    res.status(200).json({ orders });
  } catch (err) {
    console.error("Error fetching orders by username:", err);
    res.status(500).json({ message: "Error fetching orders by username" });
  }
};

module.exports = {
  placeOrder,
  getAllOrders,
  updateOrderStatus,
  getOrdersByUsername,
};