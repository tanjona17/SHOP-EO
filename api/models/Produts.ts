const mongoose = require("mongoose");

const Product_schema = new mongoose.Schema(
    {
    product_name:{
        type: String,
        required: true,
        unique: true,
    },
    descri:{
        type: String,
        required: true,
        unique: false,
    },
    img:{
        type: String,
        required: false,
        default: "default.png"
    }, 
    categories:{
        type: Array,
        required: true,
    },
    price:{
        type: Number,
        required: true,
    }
   
}, {timestamps :true}
);

const Product_model = mongoose.model("Products",Product_schema);
module.exports = Product_model;