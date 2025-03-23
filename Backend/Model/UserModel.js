const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({

    type:{
        type:String,  //dataType
        required:true, //validate
    },

    date:{
        type:Date,  //dataType
        required:true, //validate
    },

    time:{
        type:String,  //dataType
        required:true, //validate
    },

    title:{
        type:String,  //dataType
        required:true, //validate
    },

    name1:{
        type:String,  //dataType
        required:true, //validate
    },

    name2:{
        type:String,  //dataType
        required:true, //validate
    },

    email:{
        type:String,  //dataType
        required:true, //validate
    },

    phone:{
        type:Number,  //dataType
        required:true, //validate
    },

    message:{
        type:String,  //dataType
        required:true, //validate

    }

});

module.exports = mongoose.model(
        "UserModel", //file name
        userSchema //function name

)