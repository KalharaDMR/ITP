const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();

// Import Register Model
const Register = mongoose.model("Register");

// Register Route
router.post("/register", async (req, res) => {
  const { name, gmail, password } = req.body;

  try {
    // Check if the email already exists
    const existingUser = await Register.findOne({ gmail });
    if (existingUser) {
      return res.status(400).json({ status: "error", message: "Email already exists" });
    }

    // Create a new user
    await Register.create({ name, gmail, password });
    res.status(201).json({ status: "ok", message: "User registered successfully" });
  } catch (err) {
    console.error("Error registering user:", err);
    res.status(500).json({ status: "error", message: "Internal server error" });
  }
});

module.exports = router;