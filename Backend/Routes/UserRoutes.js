const express = require("express");
const router = express.Router();

//insert Model
const User = require("../Model/UserModel")

//insert User cantroller
const UserController = require("../Controllers/UserControllers");

//create routepath
router.get("/",UserController.getAllUsers);
router.post("/",UserController.addUsers);
router.get("/:id",UserController.getById);
router.put("/:id",UserController.updateUser);
router.delete("/:id",UserController.deleteUser);

//export
module.exports = router;
