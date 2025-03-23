const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const Register = require("../Model/Register");

// Register Route
router.post("/register", async (req, res) => {
  const { name, gmail, password } = req.body;

  // Validate input fields
  if (!name || !gmail || !password) {
    return res.status(400).json({ status: "error", message: "All fields are required." });
  }

  try {
    // Check if the email already exists
    const existingUser = await Register.findOne({ gmail });
    if (existingUser) {
      return res.status(400).json({ status: "error", message: "Email already exists" });
    }

    // Hash the password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create a new user
    await Register.create({ name, gmail, password: hashedPassword });
    res.status(201).json({ status: "ok", message: "User registered successfully" });
  } catch (err) {
    console.error("Error registering user:", err);
    res.status(500).json({ status: "error", message: "Internal server error" });
  }
});

// Signin Route
router.post("/signin", async (req, res) => {
  const { gmail, password } = req.body;

  // Validate input fields
  if (!gmail || !password) {
    return res.status(400).json({ status: "error", message: "Email and password are required." });
  }

  try {
    // Find the user by email
    const user = await Register.findOne({ gmail });

    // Check if the user exists and the password is correct
    if (user && await bcrypt.compare(password, user.password)) {
      res.status(200).json({ status: "ok", message: "Sign in successful" });
    } else {
      res.status(400).json({ status: "error", message: "Invalid email or password" });
    }
  } catch (err) {
    console.error("Error signing in:", err);
    res.status(500).json({ status: "error", message: "Internal server error" });
  }
});

module.exports = router;