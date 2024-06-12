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
        required: true,
    },
    price:{
        type: Number,
        required: true,
    }
   
}, {timeStamps :true}
);

const Product_model = mongoose.model("Products",Product_schema);
module.exports = Product_model;