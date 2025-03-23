const express = require("express");
const router = express.Router();
const User = require("../Model/UserModel");
const jwt = require("jsonwebtoken");

// User registration
router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Check if the email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    // Create a new user
    const user = new User({ name, email, password });
    await user.save();

    // Generate JWT token
    const payload = { user: { id: user.id, role: "user" } };
    const token = jwt.sign(payload, "your_jwt_secret", { expiresIn: "1h" });

    res.status(200).json({ token, message: "Registration successful" });
  } catch (err) {
    console.error("Error registering user:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

// User login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email, password });
    if (user) {
      const payload = { user: { id: user.id, role: "user" } };
      const token = jwt.sign(payload, "your_jwt_secret", { expiresIn: "1h" });
      res.status(200).json({ token, message: "Login successful" });
    } else {
      res.status(400).json({ message: "Invalid email or password" });
    }
  } catch (err) {
    console.error("Error signing in:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;