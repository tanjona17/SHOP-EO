'use client'
import Image from 'next/image'
import React, { useContext, useEffect } from 'react'
import {ShoppingCartIcon  } from '@heroicons/react/24/solid';
import Link from 'next/link';
import useSWR, { mutate } from 'swr';
import { Product_type } from "@/app/types/products_type";




interface Props{
  data: [];
  error:string;
 
}

export default function ProuctsCatalogs(props: Props) {

  return (
    <>  
   <div className="  grid md:grid-cols-3 sm:grid-cols-1 lg:ml-[120px] overflow-x-hidden bg-white  mt-[35px] lg:px-[180px] md:px-[2px] sm:px-[100px] min-w-[500px] ">

   {  
      props.data && props.data.length > 0 ?   props.data.map( (x: Product_type)  =>{
        return (
        
        <div className="   
        w-[250px] bg-white
        overflow-hidden shadow-lg 
        rounded-tr-[7px] rounded-tl-[7px] 
        rounded-br-[15px] rounded-bl-[15px]
        animate__animated animate__pulse 
        lg:ml-[120px] md:mx-[10px] 
        mt-5"
        key={x._id}>
          <div className='flex w-[250px] h-[250px] justify-center p-3'>
          <Image src={`/db_images/${x.img}`} width={190} height={60}   alt="product image"/>
          </div>
       
        <div className="px-3 py-4">
          <div className=" flex justify-between font-bold text-md text-[#13304D] mb-2 px-3">
            <p>{x.product_name} </p>
            <p>{x.price}</p>
          </div>
        </div>  
        <div className="flex justify-center mb-5">
         <Link href={`/detail?id=${x._id}`}>
          <button className='
          border border-[#13304D] 
          text-[#13304D] rounded-full
          px-5 py-2 hover:bg-[#13304D] 
          hover:text-white'>
            More details
          </button>
          </Link>
          {/* <button onClick={add_to_cart}>
            <ShoppingCartIcon className=" w-[35px] p-2 ml-5 rounded-lg text-white bg-[#5B6EE8]"/>
          </button> */}
        </div>
        </div>
        )
        
      }) : <div className='mt-20 w-full text-center col-span-3 animate__animated animate__fadeIn'>Sorry there is no product matching your search! 😢 </div>

  }

  
      
    </div>
    </>
  )
}
