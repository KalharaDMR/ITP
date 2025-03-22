
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
  });*/

const express = require("express");
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
