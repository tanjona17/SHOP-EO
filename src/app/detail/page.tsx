
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
import Image from 'next/image';

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
      

      <Navbar title={'Shop-Eo'} />
      {  
    
   
      data ?
          <div className='grid grid-cols-1 h-[350px]   xl:px-[280px] lg:px-[280px]  md:px-[50px]  sm:px-[10px] mt-[120px]   justify-center '>
            <div className='flex  bg-white sm:h-[290px] rounded-[9px] '>
            <div className='
              flex bg-slate-500 md:w-[40%] sm:w-[40%] p-2 rounded-tl-[9px] rounded-bl-[9px]
            '>
              <div className='flex w-full justify-center p-2 '>
                <Image src={`/db_images/${data.img}`} width={1200} height={1000}  alt="product image" />
              </div>
              
            </div>
            <div className=' md:w-[500px] sm:w-[80%]   px-[50px] pt-5'>
              <div className='w-full grid grid-cols-2 text-[#13304D] '>
                <div className='font-bold text-[24px]'>{data.product_name}</div>
                <div className='font-bold text-[24px]'>{data.price}</div>
              </div>
              <div className='about px-0 w-full mt-5 h-[120px]  overflow-y-auto  '>
                <p className='text-[#707070]'>
                  {data.descri}
              
                </p>
              </div>
           
              <div className='sm:grid sm:grid-cols-1 md:flex  w-full flex-row justify-start  mt-10 sm:mt-0 '>
              <div className='flex  mt-0 w-full justify-center '>
                <div className='flex items-center'> 
                  <button onClick={() => handle_quantity("decrease")}  >
                    <MinusCircleIcon className=" w-[40px] p-1  ml-0 rounded-lg  text-[#5B6EE8] "/>
                  </button>
                      {quantity}
                  <button onClick={() => handle_quantity("increase")}  >
                    <PlusCircleIcon className=" w-[40px] p-1  ml-0 rounded-lg text-[#5B6EE8] "/>
                  </button>
                </div>          
              </div>
              <div className='flex md:w-full  sm:justify-center '>
              <div className=' flex bg-[#5B6EE8]  px-3 py-1 rounded-full '>
                  <ShoppingCartIcon className=" w-[35px] p-1  ml-0 rounded-lg text-white "/>
                  <button className='flex  px-3 pt-2 ' onClick={add_to_cart}>
                      Add to cart
                  </button>
                </div>
              </div>
               
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

