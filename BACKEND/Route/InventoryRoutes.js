// Route/InventoryRoutes.js
const express = require("express");
const router = express.Router();
const InventoryController = require("../Controllers/InventoryController");

router.get("/", InventoryController.getAllInventory);
router.post("/", InventoryController.addInventory);
router.get("/:id", InventoryController.getInventoryById);
router.put("/:id", InventoryController.updateInventory);
router.delete("/:id", InventoryController.deleteInventory);

module.exports = router;