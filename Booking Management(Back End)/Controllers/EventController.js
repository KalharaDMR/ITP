// EventController.js
const { validationResult } = require('express-validator');
const Event = require("../Model/EventModel");

// Get all events
const getAllEvents = async (req, res, next) => {
    try {
        const events = await Event.find();
        res.status(200).json({ events });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Error fetching events" });
    }
};

// Add new event with validation check
const addEvent = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { FirstName, LastName, Email, PhoneNumber, Country, EventType, EventDate, GuestCount, SpecialRequests } = req.body;

    try {
        const event = new Event({
            FirstName,
            LastName,
            Email,
            PhoneNumber,
            Country,
            EventType,
            EventDate,
            GuestCount,
            SpecialRequests
        });

        await event.save();
        res.status(201).json({ event });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Unable to add event" });
    }
};

// Get event by ID
const getEventById = async (req, res, next) => {
    const id = req.params.id;

    try {
        const event = await Event.findById(id);
        if (!event) {
            return res.status(404).json({ message: "Event not found" });
        }
        res.status(200).json({ event });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Error fetching event" });
    }
};

// Update event
const updateEvent = async (req, res, next) => {
    const id = req.params.id;
    const { FirstName, LastName, Email, PhoneNumber, Country, EventType, EventDate, GuestCount, SpecialRequests, Status } = req.body;

    try {
        const updatedEvent = await Event.findByIdAndUpdate(
            id,
            { FirstName, LastName, Email, PhoneNumber, Country, EventType, EventDate, GuestCount, SpecialRequests, Status },
            { new: true }
        );
        if (!updatedEvent) {
            return res.status(404).json({ message: "Event not found" });
        }
        res.status(200).json({ event: updatedEvent });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Error updating event" });
    }
};

// Delete event
const deleteEvent = async (req, res, next) => {
    const id = req.params.id;

    try {
        const deletedEvent = await Event.findByIdAndDelete(id);
        if (!deletedEvent) {
            return res.status(404).json({ message: "Event not found" });
        }
        res.status(200).json({ message: "Event deleted successfully" });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Error deleting event" });
    }
};

exports.getAllEvents = getAllEvents;
exports.addEvent = addEvent;
exports.getEventById = getEventById;
exports.updateEvent = updateEvent;
exports.deleteEvent = deleteEvent;
