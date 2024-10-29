"use client";

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Checkout_page from "../components/Checkout_page";
import { useSearchParams } from "next/navigation";

if (process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY === undefined) {
  throw new Error("NEXT_PUBLIC_STRIPE_PUBLIC_KEY is not defined");
}
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);

export default function Home() {

  const q = useSearchParams();
  const amount = q.get("amount") ;
  const convert = (amount: number, factor = 100) =>{
 
        return Math.round(amount * factor);
  }

  return (
    <main className="max-w-6xl mx-auto ">
      <div className="mb-10">
          <h2 className="font-bold"> Confirm the payement of  ${amount} ?</h2>
      </div>

      <Elements
        stripe={stripePromise}
        options={{
          mode: "payment",
          amount: convert(amount),
          currency: "usd",
        }}
      >
        <Checkout_page amount={amount} />
      </Elements>
    </main>
  );
}
