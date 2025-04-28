// EventRoutes.js
const express = require("express");
const router = express.Router();
const EventController = require("../Controllers/EventController");
const { authMiddleware, adminMiddleware } = require("../Middleware/AuthMiddleware");

// Public routes
router.get("/", EventController.getAllEvents);
router.post("/", EventController.addEvent);

// Protected routes
router.get("/:id", authMiddleware, EventController.getEventById);
router.put("/:id", authMiddleware, EventController.updateEvent);
router.delete("/:id", authMiddleware, adminMiddleware, EventController.deleteEvent);

module.exports = router;