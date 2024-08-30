
const mongoose = require("mongoose");

const Message_schema = new mongoose.Schema({
  name:{
    type: String
  },
  email:{
    type: String
  },
  subject:{
    type: String
  },
  message:{
    type: String
  }
}, {timeStamp: true});

const Message_model = mongoose.model("Message", Message_schema);
module.exports = Message_model;
