'use client'
import { MinusCircleIcon, PlusCircleIcon, TrashIcon } from '@heroicons/react/24/solid'
import React, { useContext, useState } from 'react'
import Navbar from './Navbar';
import { useSelector } from 'react-redux';


export default function User_cart() {
 
    const cart = useSelector(state => state.cart)
    console.log(cart);
    
  return (
    <>
    <Navbar/>

{/* original */}
<div className="grid grid-cols-3 gap-4">
    <div className=' h-[610px] col-span-2 overflow-y-scroll'>
    {
        cart.data.map( prod  =>{
            return (
                <>


       
                <div className=' mt-5 bg-black w-3/5'>
                        <div className='
                            flex px-[80px] pt-3 
                            w-4/5 h-[220px] shadow-lg 
                            rounded-[16px]  ' 
                            >
                            <div className='
                                        flex bg-slate-500 w-2/5 p1 h-[150px]
                                        '>
                                        <img src="/hero-img.png" alt="" />
                            </div>
                            <div className=' w-3/5 px-[50px] h-[100px]'>
                                <div className='flex grid grid-cols-2 text-[#13304D] '>
                                    <div className='font-bold text-[24px]'>{prod.title}</div>
                                    <div className='font-bold text-[24px]'>{prod.price}</div>
                                </div>
                                <div className='about  w-5/5 mt-1 text-sm text-[#707070] '>
                                {prod.descri}
                                </div>
                            </div>
                        </div>
                </div>
        
         
            </>
            )
        })
    }
    </div>
    {/* {
        cart.data.map( prod =>{
            return (
                <>


       
                <div className=' mt-5 bg-black w-3/5'>
                        <div className='
                            flex px-[80px] pt-3 
                            w-4/5 h-[220px] shadow-lg 
                            rounded-[16px]  ' 
                            >
                            <div className='
                                        flex bg-slate-500 w-2/5 p1 h-[150px]
                                        '>
                                        <img src="/hero-img.png" alt="" />
                            </div>
                            <div className=' w-3/5 px-[50px] h-[100px]'>
                                <div className='flex grid grid-cols-2 text-[#13304D] '>
                                    <div className='font-bold text-[24px]'>{prod.title}</div>
                                    <div className='font-bold text-[24px]'>{prod.price}</div>
                                </div>
                                <div className='about  w-5/5 mt-1 text-sm text-[#707070] '>
                                {prod.descri}
                                </div>
                            </div>
                        </div>
                </div>
        
         
            </>
            )
        })
    } */}
   
    <div className='bg-red-500 pt-5 px-5 '>
       <div className='text-center font-medium text-[30px]'>
            <h1>Order</h1>
       </div>
       <div className='flex'>
        <div className='w-[50%]'>
            <p>Number of product</p>
            <p>Total</p>
        </div>
        <div className='w-[50%]  text-end'>
        <p>{cart.quantity}</p>
        <p>{cart.total_price}</p>
        </div>
        
       </div>
        <div className='flex justify-center'>
            <button className='w-[150px] bg-[#5B6EE8] text-center  '>
            CHECKOUT 
            </button> 
        </div>
       
        

    </div>  
     </div>  

    {/* <div className='h-[130px]'>
            <div className='flex justify-center font-bold text-[#13304D] text-[20px]'>
                Total : {(price)*count}
            </div>
            <div className='flex justify-center mt-3'>
                <button className='
                    bg-[#5B6EE8] font-bold
                    rounded-full text-white 
                    px-7 py-2'
                >
                    Buy
                </button>
                <button className='
                    rounded-full border border-[#5B6EE8]
                    px-5 py-2 text-[#5B6EE8] ml-10'>
                    Cancel
                </button>
            </div>
    </div> */}
    </>
  )
}
