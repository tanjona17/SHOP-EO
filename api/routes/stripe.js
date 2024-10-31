const router = require("express").Router();
//  const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
 require("dotenv").config();
 const axios = require("axios");


 router.post("/create_payment_intent", async (req, res) => {
  try {
    const { amount } = req.body;

    const stripeResponse = await axios.post(
      "https://api.stripe.com/v1/payment_intents",
      new URLSearchParams({
        amount: amount.toString(),
        currency: "usd",
        "automatic_payment_methods[enabled]": "true",
      }).toString(),
      {
        headers: {
          Authorization: `Bearer ${process.env.STRIPE_SECRET_KEY}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    res.status(200).json({ clientSecret: stripeResponse.data.client_secret });
  } catch (error) {
    console.error("Internal Error:", error.message);
    res.status(500).json({ error: `Internal Server Error: ${error.message}` });
  }
});



 module.exports = router;


// import axios from "axios";

// export async function createPaymentIntent(request: Request): Promise<Response> {
//   try {
//     const { amount } = await request.json();

//     const stripeResponse = await axios.post(
//       "https://api.stripe.com/v1/payment_intents",
//       {
//         amount: amount,
//         currency: "usd",
//         automatic_payment_methods: { enabled: true },
//       },
//       {
//         headers: {
//           Authorization: `Bearer ${process.env.STRIPE_SECRET_KEY}`,
//           "Content-Type": "application/x-www-form-urlencoded",
//         },
//       }
//     );

//     return new Response(
//       JSON.stringify({ clientSecret: stripeResponse.data.client_secret }),
//       {
//         status: 200,
//         headers: { "Content-Type": "application/json" },
//       }
//     );
//   } catch (error) {
//     console.error("Internal Error:", error);
//     return new Response(
//       JSON.stringify({ error: `Internal Server Error: ${error}` }),
//       { status: 500, headers: { "Content-Type": "application/json" } }
//     );
//   }
// }



// const express = require("express");
// const axios = require("axios");
// require("dotenv").config();

// const app = express();
// app.use(express.json());

// app.post("/create-payment-intent", async (req, res) => {
//   try {
//     const { amount } = req.body;

//     const stripeResponse = await axios.post(
//       "https://api.stripe.com/v1/payment_intents",
//       new URLSearchParams({
//         amount: amount.toString(),
//         currency: "usd",
//         "automatic_payment_methods[enabled]": "true",
//       }).toString(),
//       {
//         headers: {
//           Authorization: `Bearer ${process.env.STRIPE_SECRET_KEY}`,
//           "Content-Type": "application/x-www-form-urlencoded",
//         },
//       }
//     );

//     res.status(200).json({ clientSecret: stripeResponse.data.client_secret });
//   } catch (error) {
//     console.error("Internal Error:", error.message);
//     res.status(500).json({ error: `Internal Server Error: ${error.message}` });
//   }
// });

// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });
