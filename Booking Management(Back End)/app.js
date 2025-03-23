
/*//mongoose.connect("mongodb+srv://admin4:ZTSo6H79F1xMDM1H@cluster0.o31co.mongodb.net/")
const express = require("express");
const mongoose = require("mongoose");
const router = require("./Routes/BookingRoutes");

const cors = require("cors");

const app = express();

// Middleware
app.use(cors({
  origin: "http://localhost:3000", // Allow requests from your frontend
  credentials: true,
}));
app.use(express.json());
app.use("/users", router);

mongoose.connect("mongodb+srv://admin4:ZTSo6H79F1xMDM1H@cluster0.o31co.mongodb.net/")
  .then(() => console.log("Connected to MongoDB"))
  .then(() => {
    app.listen(5000);
  })
  .catch((err) => console.log(err));

  //call Register Model
  require("./Model/Register");
  const Register = mongoose.model("Register");
  app.post("/register", async(req, res) =>{
    const {name,gmail,password }= req.body;
    try{
      await Room.create({
        name,
        gmail,
        password,
      })
      res.send({status:"ok"});
    }catch(err){
      res.send({status: "err"});
    }
  });
  // Signin Route
app.post("/signin", async (req, res) => {
  const { gmail, password } = req.body;

  try {
    const user = await Register.findOne({ gmail, password });
    if (user) {
      res.status(200).json({ status: "ok", message: "Sign in successful" });
    } else {
      res.status(400).json({ status: "error", message: "Invalid email or password" });
    }
  } catch (err) {
    console.error("Error signing in:", err);
    res.status(500).json({ status: "error", message: "Internal server error" });
  }
});*/

/*const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

// Import Routes
const bookingRoutes = require("./Routes/BookingRoutes");

const app = express();

// Middleware
app.use(cors({
  origin: "http://localhost:3000", // Allow requests from your frontend
  credentials: true,
}));
app.use(express.json());

// Connect to MongoDB
mongoose.connect("mongodb+srv://admin4:ZTSo6H79F1xMDM1H@cluster0.o31co.mongodb.net/")
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log("MongoDB connection error:", err));

// Use Routes
app.use("/users", bookingRoutes); // Existing booking routes

// Call Register Model
require("./Model/Register");
const Register = mongoose.model("Register");

// Register Route
app.post("/register", async (req, res) => {
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

// Start the server
app.listen(5000, () => {
  console.log("Server is running on http://localhost:5000");
});

app.post("/signin", async (req, res) => {
  const { gmail, password } = req.body;

  try {
    const user = await Register.findOne({ gmail, password });
    if (user) {
      res.status(200).json({ status: "ok", message: "Sign in successful" });
    } else {
      res.status(400).json({ status: "error", message: "Invalid email or password" });
    }
  } catch (err) {
    console.error("Error signing in:", err);
    res.status(500).json({ status: "error", message: "Internal server error" });
  }
});

/*const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

// Import Routes
const bookingRoutes = require("./Routes/BookingRoutes");

const app = express();

// Middleware
app.use(cors({
  origin: "http://localhost:3000", // Allow requests from your frontend
  credentials: true,
}));
app.use(express.json());

// Connect to MongoDB
mongoose.connect("mongodb+srv://admin4:ZTSo6H79F1xMDM1H@cluster0.o31co.mongodb.net/")
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log("MongoDB connection error:", err));

// Use Routes
app.use("/users", bookingRoutes); // Existing booking routes

// Call Register Model
require("./Model/Register");
const Register = mongoose.model("Register");

// Call Booking Model
require("./Model/BookingModel"); // Updated to use BookingModel
const Booking = mongoose.model("BookingModel"); // Updated to use BookingModel

// Register Route
app.post("/register", async (req, res) => {
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

// Signin Route
app.post("/signin", async (req, res) => {
  const { gmail, password } = req.body;

  try {
    const user = await Register.findOne({ gmail, password });
    if (user) {
      res.status(200).json({ status: "ok", message: "Sign in successful" });
    } else {
      res.status(400).json({ status: "error", message: "Invalid email or password" });
    }
  } catch (err) {
    console.error("Error signing in:", err);
    res.status(500).json({ status: "error", message: "Internal server error" });
  }
});

// Admin Login Route
app.post("/admin/login", (req, res) => {
  const { email, password } = req.body;

  // Hardcoded admin credentials
  if (email === "admin123@gmail.com" && password === "8080") {
    res.status(200).json({ status: "ok", message: "Admin login successful" });
  } else {
    res.status(401).json({ status: "error", message: "Invalid email or password" });
  }
});

// Protected Admin Route (Example: Fetch all bookings)
app.get("/admin/bookings", (req, res) => {
  // Check if the request is from an authenticated admin
  const { authorization } = req.headers;

  if (authorization === "admin123@gmail.com:8080") {
    // Fetch all bookings from the database
    Booking.find({})
      .then((bookings) => res.status(200).json({ status: "ok", bookings }))
      .catch((err) => res.status(500).json({ status: "error", message: err.message }));
  } else {
    res.status(403).json({ status: "error", message: "Unauthorized access" });
  }
});

// Start the server
app.listen(5000, () => {
  console.log("Server is running on http://localhost:5000");
});*/

//mongoose.connect("mongodb+srv://admin4:ZTSo6H79F1xMDM1H@cluster0.o31co.mongodb.net/")
const express = require("express");
const mongoose = require("mongoose");
const router = require("./Routes/BookingRoutes");

const cors = require("cors");

const app = express();

// Middleware
app.use(cors({
  origin: "http://localhost:3000", // Allow requests from your frontend
  credentials: true,
}));
app.use(express.json());
app.use("/users", router);

mongoose.connect("mongodb+srv://admin4:ZTSo6H79F1xMDM1H@cluster0.o31co.mongodb.net/")
  .then(() => console.log("Connected to MongoDB"))
  .then(() => {
    app.listen(5000);
  })
  .catch((err) => console.log(err));

  //call Register Model
  require("./Model/Register");
  const Register = mongoose.model("Register");
  app.post("/register", async(req, res) =>{
    const {name,gmail,password }= req.body;
    try{
      await Room.create({
        name,
        gmail,
        password,
      })
      res.send({status:"ok"});
    }catch(err){
      res.send({status: "err"});
    }
  });
  // Signin Route
app.post("/signin", async (req, res) => {
  const { gmail, password } = req.body;

  try {
    const user = await Register.findOne({ gmail, password });
    if (user) {
      res.status(200).json({ status: "ok", message: "Sign in successful" });
    } else {
      res.status(400).json({ status: "error", message: "Invalid email or password" });
    }
  } catch (err) {
    console.error("Error signing in:", err);
    res.status(500).json({ status: "error", message: "Internal server error" });
  }
});