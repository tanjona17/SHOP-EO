import React, { useEffect, useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';

// Initialize Stripe.js with your publishable key
const stripePromise = loadStripe('your-publishable-key');

export default function App() {
    const [clientSecret, setClientSecret] = useState<string | null>(null);

    // Fetch client secret from your backend on component mount
    useEffect(() => {
        // Assuming you fetch client secret from backend
        fetch("/create-payment-intent")
            .then((res) => res.json())
            .then((data) => setClientSecret(data.clientSecret));
    }, []);

    const options = {
        clientSecret,
    };

    return (
        clientSecret && (
            <Elements stripe={stripePromise} options={options}>
                <Checkout_form />
            </Elements>
        )
    );
}



import React, { useState } from 'react';
import { PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';

export default function Checkout_form() {
    const stripe = useStripe();
    const elements = useElements();

    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        if (!stripe || !elements) {
            // Stripe.js hasn't loaded yet. Make sure to disable form submission until Stripe.js has loaded.
            return;
        }

        setLoading(true);

        const { error } = await stripe.confirmPayment({
            elements,
            confirmParams: {
                return_url: 'https://your-site.com/checkout-complete',
            },
        });

        if (error) {
            setErrorMessage(error.message || 'An error occurred');
        }

        setLoading(false);
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <PaymentElement />
                <button disabled={!stripe || loading}>
                    {loading ? 'Processing...' : 'Pay'}
                </button>
                {errorMessage && <div>{errorMessage}</div>}
            </form>
        </div>
    );
}

