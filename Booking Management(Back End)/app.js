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

// Add this to your app.js after other route imports
const eventRouter = require("./Routes/EventRoutes");
app.use("/events", eventRouter);