/*const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    FirstName:{
        type:String,
        required:true,
    },
    LastName:{
        type:String,
        required:true,
    },
    ContactNumber:{
        type:String,
        required:true,
    },
    Email:{
        type:String,
        required:true,
    },
    BookingDate:{
        type:Date,
        required:true,
    },
    SafariType:{
        type:String,
        required:true,
    },
    NoOfAdults:{
        type:Number,
        required:true,
    },
    NoOfKids:{
        type:Number,
        required:true,
    },
    Nationality:{
        type:String,
        required:true,
    }
});

module.exports = mongoose.model(
    "BookingModel",//file name
    userSchema //function name
)*/

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    FirstName:{
        type:String,
        required:true,
    },
    LastName:{
        type:String,
        required:true,
    },
    ContactNumber:{
        type:String,
        required:true,
    },
    Email:{
        type:String,
        required:true,
    },
    BookingDate:{
        type:Date,
        required:true,
    },
    SafariType:{
        type:String,
        required:true,
    },
    NoOfAdults:{
        type:Number,
        required:true,
    },
    NoOfKids:{
        type:Number,
        required:true,
    },
    Nationality:{
        type:String,
        required:true,
    }
});

module.exports = mongoose.model(
    "BookingModel",//file name
    userSchema //function name
)