const router = require("express").Router();
const mongoose = require("mongoose");
const Message = require("../models/Message.ts")

router.get("/", async(req, res) =>{

    try{
        const message = await Message.find();
        res.status(200).json(message)
    }catch(error){
        console.log(error)
    }
} );

router.post("/", async(req, res) =>{
    const new_message = new Message({
        name: req.body.name,
        mail: req.body.mail,
        subject: req.body.subject,
        message: req.body.message,
    });
    
    const saved_message = new_message.save();
    res.status(201).json(saved_message);
});

module.exports = router;