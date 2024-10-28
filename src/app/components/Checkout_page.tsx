"use client"

import React, { useEffect, useState } from 'react'

import {
    useStripe,
    useElements,
    PaymentElement,
} from "@stripe/react-stripe-js"
import axios from 'axios';
import { useRouter } from 'next/navigation';




interface Amount{
    amount: number
}
export default function Checkout_page(props: Amount) {
    const stripe = useStripe();
const elements = useElements();

const [err_msg, set_err] = useState<string>();
const [clientSecret, set_clientSecret] = useState("");
const [loading, set_loading] = useState(false);

useEffect(() => {
  const createPaymentIntent = async () => {
    try {
      const response = await axios.post("http://localhost:1234/api/stripe/create_payment_intent", {
        amount: props.amount,
      }, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      set_clientSecret(response.data.clientSecret);
    } catch (error) {
      console.error("Error creating payment intent:", error);
    }
  };

  createPaymentIntent();
}, [props.amount]);

const router  = useRouter();
const handle_submit = async (e: React.FormEvent<HTMLFormElement>) =>{
  e.preventDefault();
  set_loading(true);
  if (!stripe || ! elements) {
    return;
  }
  
 const { error: submit_error} = await elements.submit();

  if (submit_error) {
    set_err(submit_error.message);
    set_loading(false);
    return;
    
  }

  const {error} = await stripe?.confirmPayment ({
    elements,
    clientSecret,
    confirmParams:{
      return_url : `http://localhost:3000/payment_success?amount=${props.amount}`
    }
  })

  if (error) {
    set_err(error.message)
    
  } else {
    
  };        
  set_loading(false);

}

  return (
    
    <div className='bg-blue-500 w-full h-[350px] flex justify-center'>
      <form className='' onSubmit={ handle_submit} >
        {clientSecret && <PaymentElement/>}

        <button
          className='bg-black text-white'
        >
              Pay ${props.amount}
        </button>
      </form>
    

    </div>
  )
}
