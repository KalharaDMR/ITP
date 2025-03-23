const express = require("express");
const mongoose = require("mongoose");
const router = require("./Routes/UserRoutes"); //insert user Routes

const app = express();
const cors = require("cors");

//Middleware
app.use(express.json());
app.use(cors());
app.use("/users",router);



mongoose.connect("mongodb+srv://admin2:RaJUYVElMhEJb4cP@cluster0.cqytj.mongodb.net/")

.then(() => console.log("Connected to MongoDB"))
.then(() => {
    app.listen(5000);
})

.catch((err)=> console.log((err)));