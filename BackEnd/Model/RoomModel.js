const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const roomSchema = new Schema({

    roomNumber:{ 
        type:String,  //datatype
        required:true, //validate
    },
    
    roomType:{ 
        type:String,
        required:true,
    },

    pricePerNight:{ 
        type:Number,
        required:true,
    },

    features:{ 
        type:String,
        required:true,
    },

    capacity:{ 
        type:String,
        required:true,
    },

    status:{ 
        type:String,
        required:true,
    },

    description:{ 
        type:String,
        required:true,
    },

    imageUrl:{ 
        type:String,
        required:true,
    },
    }); 




module.exports = mongoose.model(
    "RoomModel",  //file name
    roomSchema  //function name
)