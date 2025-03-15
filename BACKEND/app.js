// app.js
const express = require("express");
const mongoose = require("mongoose");

const inventoryRoutes = require("./Route/InventoryRoutes"); // Add this line
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

// Use user and inventory routes

app.use("/inventory", inventoryRoutes); // Add this line

mongoose
  .connect("mongodb+srv://dmrkalhara1007:rRUaYYc80F7zeppg@mycluster.e2pzt.mongodb.net/")
  .then(() => console.log("Connected to MongoDB"))
  .then(() => {
    app.listen(5000, () => console.log("Server running on port 5000"));
  })
  .catch((err) => console.log(err));