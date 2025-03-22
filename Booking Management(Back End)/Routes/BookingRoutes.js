const express = require("express");
const router = express.Router();

// Import Model (Ensure correct model is used)
const Booking = require("../Model/BookingModel");

// Import Controller
const BookingController = require("../Controllers/BookingController");

// Routes


router.get("/", BookingController.getAllUsers);
router.post("/", BookingController.addUsers);
router.get("/:id", BookingController.getById);
router.put("/:id", BookingController.updateUser);
router.delete("/:id", BookingController.deleteUser);


// Export the router
module.exports = router;

