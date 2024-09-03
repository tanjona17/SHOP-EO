

const mongoose = require("mongoose");

const User_schema = new mongoose.Schema({
    username:{
        type: String,
        required: true,
        unique: true,
    },
    email:{
        type: String,
        required: true,
        unique: true,
        
    },
    password:{
        type: String,
        required: true,
    },
    img:{
        type: String,
        required: true,
        default: "default.png"
    },
    is_admin: {
        type:Boolean,
        required: false,
        default:false
    }
},{timeStamps: true});
const User_model = mongoose.model("User",User_schema);
module.exports = User_model;
