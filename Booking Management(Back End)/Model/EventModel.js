// EventModel.js
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const eventSchema = new Schema({
    FirstName: {
        type: String,
        required: true,
    },
    LastName: {
        type: String,
        required: true,
    },
    Email: {
        type: String,
        required: true,
    },
    PhoneNumber: {
        type: String,
        required: true,
    },
    Country: {
        type: String,
        required: true,
    },
    EventType: {
        type: String,
        required: true,
    },
    EventDate: {
        type: Date,
        required: true,
    },
    GuestCount: {
        type: Number,
        required: true,
    },
    SpecialRequests: {
        type: String,
    },
    Status: {
        type: String,
        default: "Pending"
    }
});

module.exports = mongoose.model("Event", eventSchema);