
const express = require("express");
const router = express.Router();

//insert Model
const room = require("../Model/RoomModel")


const Roomcontroller = require("../Controllers/Roomcontroller");

router.get("/",Roomcontroller.GetAllRooms);  //display

router.post("/",Roomcontroller.addrooms); //insert

router.get("/:id",Roomcontroller.getById); //get by id

router.put("/:id",Roomcontroller.updateRooms); //get by id

router.delete("/:id",Roomcontroller.deleterooms);



//export
module.exports = router;