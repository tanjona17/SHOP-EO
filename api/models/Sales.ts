const mongoose = require("mongoose");

const Sales_schema = new mongoose.Schema(
    {
        product_name : {
            type: String,
            required: true,
        },
        quantity: {
            type: Number,
            required: true,
        },
        total_price: {
            type: Number,
            required: true,
        }
    }, {timeStamps :true}
);
const Sales_model = mongoose.model("Sales",Sales_schema);
module.exports = Sales_model;