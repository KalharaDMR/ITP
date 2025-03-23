const express = require("express");
const router = express.Router();
const Admin = require("../Model/AdminModel");
const jwt = require("jsonwebtoken");
const { authMiddleware, adminMiddleware } = require("../Middleware/AuthMiddleware");

// Admin login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const admin = await Admin.findOne({ email, password });
    if (admin) {
      const payload = { user: { id: admin.id, role: "admin" } };
      const token = jwt.sign(payload, "your_jwt_secret", { expiresIn: "1h" }); // Replace with your secret key
      res.status(200).json({ token });
    } else {
      res.status(400).json({ message: "Invalid email or password" });
    }
  } catch (err) {
    console.error("Error signing in:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Protected admin route
router.get("/bookings", authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const bookings = await Booking.find();
    res.status(200).json({ bookings });
  } catch (err) {
    console.error("Error fetching bookings:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;