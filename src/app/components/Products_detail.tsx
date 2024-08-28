'use client'
import { ShoppingCartIcon } from '@heroicons/react/24/solid';
import Navbar from "./Navbar";
import React, { useEffect } from 'react';
import axios from 'axios';
import useSWR from 'swr';
import { useRouter, useSearchParams} from 'next/navigation';

import { ObjectId } from 'mongoose';

const fetcher = (...args: [any] ) => fetch(...args).then( (res) => res.json());

interface Params {
  params: {id: ObjectId};
}

export default  function Products_cart() {
  const search_params = useSearchParams();
  const q = search_params.get("id");

   
  const {data,isLoading, error} = useSWR(`http://localhost:1234/api/product/${q}`, fetcher, {
    revalidateOnFocus: false
  });

  if (isLoading) return <div>loading...</div>
  
 console.log(data);




  return (
    <>

      <Navbar title={'Shop Eo'}/>
      {/* {  
   
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
              <div className='flex justify-start mt-10 '>
                <div className='flex bg-[#5B6EE8] px-5 py-1 rounded-full'>
                  <ShoppingCartIcon className=" w-[35px] p-1  ml-0 rounded-lg text-white "/>
                  <button className='flex  px-5 pt-2 '>
                      Add to cart
                  </button>
                </div>
                    </div>
            </div>
          </div>
          :
       <p>{error}</p>
  } */}
    </>
  )
}
