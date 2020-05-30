const mongoose = require("mongoose");

const menuItemSchema = new mongoose.Schema({
    name:{
        type:String,
        trim:true,
        required:true,
        unique:true
    }
},
{timestamps:true})


module.exports = mongoose.model("MenuItem",menuItemSchema);
