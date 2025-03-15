// Controllers/InventoryController.js
const Inventory = require("../Model/InventoryModel");

// Get all inventory items
const getAllInventory = async (req, res, next) => {
  let inventory;
  try {
    inventory = await Inventory.find();
  } catch (err) {
    console.log(err);
  }

  if (!inventory) {
    return res.status(404).json({ message: "No inventory found" });
  }
  return res.status(200).json({ inventory });
};

// Add a new inventory item
const addInventory = async (req, res, next) => {
  const { name, quantity, unit, pricePerUnit, supplier } = req.body;
  let inventory;

  try {
    inventory = new Inventory({ name, quantity, unit, pricePerUnit, supplier });
    await inventory.save();
  } catch (err) {
    console.log(err);
  }

  if (!inventory) {
    return res.status(400).send({ message: "Unable to add inventory item" });
  }
  return res.status(201).json({ inventory });
};

// Get inventory item by ID
const getInventoryById = async (req, res, next) => {
  const id = req.params.id;
  let inventory;

  try {
    inventory = await Inventory.findById(id);
  } catch (err) {
    console.log(err);
  }

  if (!inventory) {
    return res.status(404).json({ message: "Inventory item not found" });
  }
  return res.status(200).json({ inventory });
};

// Update inventory item
const updateInventory = async (req, res, next) => {
  const id = req.params.id;
  const { name, quantity, unit, pricePerUnit, supplier } = req.body;
  let inventory;

  try {
    inventory = await Inventory.findByIdAndUpdate(
      id,
      { name, quantity, unit, pricePerUnit, supplier },
      { new: true }
    );
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Error updating inventory item" });
  }

  if (!inventory) {
    return res.status(404).json({ message: "Inventory item not found" });
  }
  return res.status(200).json({ inventory });
};

// Delete inventory item
const deleteInventory = async (req, res, next) => {
  const id = req.params.id;
  let inventory;

  try {
    inventory = await Inventory.findByIdAndDelete(id);
  } catch (err) {
    console.log(err);
  }

  if (!inventory) {
    return res.status(404).json({ message: "Unable to delete inventory item" });
  }
  return res.status(200).json({ inventory });
};

module.exports = {
  getAllInventory,
  addInventory,
  getInventoryById,
  updateInventory,
  deleteInventory,
};