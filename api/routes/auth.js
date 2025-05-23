
require("dotenv").config("next.config.mjs");

const User = require("../models/User.ts")
const router = require("express").Router();
const CryptoJS = require("crypto-js");
const secret_key = process.env.PASSWORD_KEY;
const jwt = require("jsonwebtoken");


router.post("/register", async (req, res) =>{
    const new_user = new User({
        username: req.body.username,
        email: req.body.email,
        password:  CryptoJS.AES.encrypt(req.body.password, secret_key).toString(),
       
    });
    
    try{
        const saved_user = await new_user.save();
        res.status(201).json(saved_user);
    }catch(error){
        res.status(500).json(error);
    }
});

router.post("/login", async (req,res) =>{
    try {

        const user = await User.findOne({username: req.body.username});
        !user && res.status(401).json("wrong data");

        const hash_password = CryptoJS.AES.decrypt(user.password, secret_key);
        const pass = hash_password.toString(CryptoJS.enc.Utf8);
        pass !== req.body.password && res.status(401).json("wrong data");
        
        const access_token = jwt.sign({
            id: user.id
        },
        process.env.JWT_KEY, 
        {expiresIn:"2d"}
    );

        const {password , ...other} = user._doc;
        res.status(200).json({...other, access_token});

    } catch (error) {
        console.log(error);
    }
})




module.exports = router;