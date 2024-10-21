// const router = require("express").Router();
// const stripe = require('stripe')('your-secret-key');

 

// router.post("/payment", async(req,res) =>{
//     const { amount, currency } = req.body;

//     try {
//       const paymentIntent = await stripe.paymentIntents.create({
//         amount, // amount in smallest currency unit (e.g., cents)
//         currency, // e.g., 'usd'
//       });
  
//       res.status(200).json({ clientSecret: paymentIntent.client_secret });
//     } catch (error) {
//       res.status(500).json({ error: error.message });
//     }
// })

// module.exports = router;