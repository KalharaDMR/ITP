// app.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser"); // ADD THIS

// Import routes
const inventoryRoutes = require("./Route/InventoryRoutes");
const menuRoutes = require("./Route/MenuRoutes");
const orderRoutes = require("./Route/OrderRoutes");

const app = express();

// Middleware
app.use(cors());

// These two lines are important for large Base64 image uploads
app.use(bodyParser.json({ limit: "10mb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "10mb" }));

// Use routes
app.use("/inventory", inventoryRoutes);
app.use("/menu", menuRoutes);
app.use("/orders", orderRoutes);

// MongoDB connection
mongoose
  .connect("mongodb+srv://dmrkalhara1007:<password>@mycluster.e2pzt.mongodb.net/?retryWrites=true&w=majority&appName=MyCluster")
  .then(() => {
    console.log("Connected to MongoDB");

    // Only start server after successful DB connection
    app.listen(5000, () => {
      console.log("Server running on port 5000");
    });
  })
  .catch((err) => console.log(err));
