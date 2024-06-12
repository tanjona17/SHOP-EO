
'use client'
import { MinusCircleIcon, PlusCircleIcon, ShoppingCartIcon, TrashIcon } from '@heroicons/react/24/outline';
import Navbar from "../components/Navbar";
import React, { MouseEventHandler, useEffect, useState } from 'react';
import axios from 'axios';
import useSWR from 'swr';
import { useRouter, useSearchParams} from 'next/navigation';
const mongoose = require("mongoose")
import { ObjectId } from 'mongoose';
import { count } from 'console';
import { add_product } from '@/redux/cart_redux';
import { useDispatch } from 'react-redux';
import Footer from '../components/Footer';

const fetcher = (...args: [any] ) => fetch(...args).then( (res) => res.json());

export default  function Products_cart() {
  const [quantity, set_quantity] = useState<number>(1);
  const dispatch = useDispatch();
  const handle_quantity = (action: string):void =>{ 
        if (action ==="increase") {
          set_quantity(quantity + 1);
        }else{
          
          quantity === 0 ? set_quantity(0) : set_quantity(quantity - 1);
        }
      
      }
   
  const search_params = useSearchParams();
  const q = search_params.get("id");
  const objectID = new mongoose.Types.ObjectId(q)
  const {data,isLoading, error} = useSWR(`http://localhost:1234/api/product?id=${objectID}`, fetcher, {
    revalidateOnFocus: false
  });
  if (isLoading) return <div>loading...</div>
  
  const add_to_cart = () =>{
    dispatch( add_product({data, quantity, price:data.price * quantity}))
  }
 



  return (
    <>
      

      
      <Navbar title={'Shop-Eo'}/>
      {  
    
   
      data ?
          <div className='flex px-[80px] mt-[50px]'>
            <div className='
              flex bg-slate-500 w-2/5
            '>
              <img src="/hero-img.png" alt="" />
            </div>
            <div className=' w-3/5 px-[50px]'>
              <div className='flex grid grid-cols-2 text-[#13304D] '>
                <div className='font-bold text-[24px]'>{data.title}</div>
                <div className='font-bold text-[24px]'>{data.price}</div>
              </div>
              <div className='about px-0 w-4/5 mt-5  '>
                <p className='text-[#707070]'>
                  {data.descri}
                </p>
              </div>
           
              <div className='flex justify-start w-3/5 mt-10 '>
              <div className='flex  mt-0 w-1/5 justify-start '>
                            <div className='flex   items-center'> 
                                <button onClick={() => handle_quantity("decrease")}  >
                                    <MinusCircleIcon className=" w-[40px] p-1  ml-0 rounded-lg  text-[#5B6EE8] "/>
                                </button>
                                 {quantity}
                                <button onClick={() => handle_quantity("increase")}  >
                                    <PlusCircleIcon className=" w-[40px] p-1  ml-0 rounded-lg text-[#5B6EE8] "/>
                                </button>
                            </div>          
              </div>
                <div className='flex bg-[#5B6EE8] px-3 py-1 rounded-full ml-[60px]'>
                  <ShoppingCartIcon className=" w-[35px] p-1  ml-0 rounded-lg text-white "/>
                  <button className='flex  px-3 pt-2 ' onClick={add_to_cart}>
                      Add to cart
                  </button>
                </div>
                    </div>
            </div>
          </div>
          :
       <p>NO data </p>

     
  }
  {/* <Footer /> */}
 
    </>
  )
}

