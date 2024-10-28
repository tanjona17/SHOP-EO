// // backend/payment.js or your API route
// const stripe = require('stripe')('your-secret-key');

// export default async function handler(req, res) {
//   const { amount, currency } = req.body;

//   try {
// 	const paymentIntent = await stripe.paymentIntents.create({
//   	amount, // amount in smallest currency unit (e.g., cents)
//   	currency, // e.g., 'usd'
// 	});

// 	res.status(200).json({ clientSecret: paymentIntent.client_secret });
//   } catch (error) {
// 	res.status(500).json({ error: error.message });
//   }
// }
// Back,




// Front,

// const stripePromise = loadStripe('your-public-key');

// function CheckoutForm() {
//   const stripe = useStripe();
//   const elements = useElements();
//   const [error, setError] = useState(null);
//   const [paymentSuccess, setPaymentSuccess] = useState(false);

//   const handleSubmit = async (e) => {
// 	e.preventDefault();
	
// 	if (!stripe || !elements) return; // Stripe.js has not yet loaded

// 	const cardElement = elements.getElement(CardElement);

// 	// Fetch the Payment Intent clientSecret from your backend
// 	const response = await fetch('/api/payment', {
//   	method: 'POST',
//   	headers: { 'Content-Type': 'application/json' },
//   	body: JSON.stringify({ amount: 1000, currency: 'usd' }) // example amount
// 	});

// 	const { clientSecret } = await response.json();

// 	// Confirm the payment
// 	const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
//   	payment_method: {
//     	card: cardElement,
//   	},
// 	});

// 	if (error) {
//   	setError(error.message);
// 	} else if (paymentIntent.status === 'succeeded') {
//   	setPaymentSuccess(true);
// 	}
//   };

//   return (
// 	<form onSubmit={handleSubmit}>
//   	<CardElement />
//   	<button type="submit" disabled={!stripe}>Pay</button>
//   	{error && <div>{error}</div>}
//   	{paymentSuccess && <div>Payment successful!</div>}
// 	</form>
//   );
// }

// export default function App() {
//   return (
// 	<Elements stripe={stripePromise}>
//   	<CheckoutForm />
// 	</Elements>
//   );
// }// Load your Stripe public key




"use client"


// import { useState } from 'react';
// import { loadStripe } from '@stripe/stripe-js';
// import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';


// import { useState } from 'react';
// import { loadStripe } from '@stripe/stripe-js';
//  import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

 import React from 'react'
 import { useState } from 'react';
import { loadStripe, Stripe } from '@stripe/stripe-js';
 import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import Checkout_form from '../components/Checkout_form';

 

 let stripe: Stripe | null = null;
 
 const initStripe = async () => {
   if (process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY === undefined) {
      throw new Error("NEXT_PUBLIC_STRIPE_PUBLIC_KEY is not defined")
      
   }
     stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);
     if (!stripe) {
         throw new Error('Failed to initialize Stripe');
     }
 };
 
 // Call initStripe to set up the Stripe instance
 initStripe().catch((error) => {
     console.error('Stripe initialization error:', error);
 });
 
 export default function page() {
    const amount = 77.77
   return (
    <main>
     <div>you have to pay {amount}</div>


     
     <Elements stripe={stripe}
        options={{
            mode: "payment",
            amount: amount, 
        }}
     
     >
   	   <Checkout_form amount={amount} />
 	</Elements>
     </main>
   )
 }
 