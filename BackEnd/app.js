//password = v6p8Ehb1LkacAXyg
const express = require("express");
const mongoose = require("mongoose");
const router = require("./Routes/RoomRoute");

const app = express();
const cors = require("cors");

//middlewaren
app.use(express.json());
app.use(cors());
app.use("/Rooms",router);


mongoose.connect("mongodb+srv://manager:v6p8Ehb1LkacAXyg@cluster0.qvue5.mongodb.net/")
.then(()=> console.log("Connected to mongoDB"))
.then(()=> {
    app.listen(5000);
    })
   
.catch((err)=> console.log((err)));
