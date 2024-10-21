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


// import { useState } from 'react';
// import { loadStripe } from '@stripe/stripe-js';
// import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

// // Load your Stripe public key
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
// }



