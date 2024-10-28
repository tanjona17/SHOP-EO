"use client"


import {
    useStripe,
    useElements,
    PaymentElement,
} from "@stripe/react-stripe-js"
import axios from 'axios';
import { headers } from "next/headers";

// const Checkout_form = ({amount}: { amount: number}) =>{


//     const stripe = useStripe();
//     const elements = useElements();

//     const [err_msg, set_err] = useState<string>();
//     const [client_scrt, set_client_scrt] = useState<string>();
//     const [loading, set_loading] = useState(false);

//     useEffect(() => {
//         axios.post("http://localhost:1234/api/stripe")
        
//     }, []);
    
// };

// export default Checkout_form;
interface Amount{
    amount: number
}

import React, { useEffect, useState } from 'react'




export default function Checkout_form(props: Amount) {
      const stripe = useStripe();
    const elements = useElements();

    const [err_msg, set_err] = useState<string>();
    const [client_scrt, set_client_scrt] = useState<string>();
    const [loading, set_loading] = useState(false);

useEffect(() => {
  axios.post("http://localhost:3000/1234/stripe_payement",{
    body: props.amount
  }).then((res) => res.json());
  
}, []);

   
  return (
    
        <div>

        
      <form action="">
        {client_scrt && <PaymentElement/>}
        <button>Pay</button>
      </form>
    
      </div>
    
  )
}
