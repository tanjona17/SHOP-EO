"use client";
import {
  MinusCircleIcon,
  PlusCircleIcon,
  TrashIcon,
} from "@heroicons/react/24/solid";
import React, { useContext, useState } from "react";
import Navbar from "./Navbar";
import { useDispatch, useSelector } from "react-redux";
import { Product_type } from "../types/products_type";
import Image from "next/image";
import { reset_cart } from '@/redux/cart_redux';
import Link from "next/link";

export default function User_cart() {

    const dispatch = useDispatch();
    const cart = useSelector((state) => state.cart);
    const product_name = cart.data.length > 0 ?  cart.data[0].product_name : ""
    const quantity = useSelector((state) => state.cart.quantity);
    const total_price = useSelector((state) => state.cart.total_price);

    console.log();
    
    const reset = ()=>{
        dispatch(reset_cart());
    };

    const checkout = () =>{

    };
    const save_payment = async () => {
      try {
        const response = await fetch("http://localhost:1234/api/product/payment", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            product_name,
            quantity,
            total_price,
          }),
        });

        const data = await response.json();
        console.log("Payment saved successfully:", data);
      } catch (error) {
        console.error("Error saving payment:", error);
      }
    };

  return (
    <>
      <Navbar title={"Shop Eo"} />

      {/* original */}
      <div className="grid md:grid-cols-3 sm:grid-cols-1 md:gap-4 sm:gap-0 mt-5 ">
        <div className="  md:h-[610px] sm:h-[350px] sm:justify-center col-span-2 overflow-y-scroll overflow-x-hidden mt-10">
          {cart.data.length > 0 ? cart.data.map((prod: Product_type) => {
            return (
              <>
                <div className=" mt-5  md:w-4/5 sm:w-full ml-5  flex justify-center">
                  <div
                    className="
                        flex px-[80px] pt-3 
                        w-4/5 h-[190px] shadow-lg 
                        rounded-[16px]  bg-white"
                        
                  >
                    <div
                      className="
                        flex bg-slate-500 w-2/5 p1 h-[150px]
                            "
                    >
                      <Image
                        src={`/db_images/${prod.img}`}
                        width={1000}
                        height={1000}
                        alt="product image"
                      />
                    </div>

                    <div className=" w-full px-[50px] h-[100px]">
                      <div className=" flex justify-around text-[#13304D] ">
                        <div className="font-bold text-[24px]">
                          {prod.product_name}
                        </div>
                        <div className="font-bold text-[24px]">
                          ${prod.price}
                        </div>
                      </div>
                      <div className="about  w-5/5 mt-3 text-sm text-[#707070] ">
                        {prod.descri}
                      </div>
                    </div>
                  </div>
                </div>
              </>
            );
          }) : 
          <div className="mt-10 grid grid-rows-2 justify-center ">
            <div>Your cart is empty.</div>
            <Link href={"/shop"}>
                <button className='
                bg-[#5B6EE8] font-bold
                rounded-full text-white 
                px-7 py-2' >
                Shop now
                    </button>
                            </Link>
          </div> }
        </div>

       

        <div className="bg-white pt-5 px-5 mt-10 ">
          <div className="text-center font-medium text-[30px]">
            <h1>Order</h1>
          </div>
          <div className="flex">
            <div className="w-[50%]">
              <p>Number of product</p>
              <p className="mt-5">Total</p>
            </div>
            <div className="w-[50%]  text-end">
              <p>{cart.quantity}</p>
              <p className="mt-5">${cart.total_price}</p>
              {/* <input type="text" className="w-20  appearance-none border-0py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" value={cart.total_price}  /> */}
            </div>
          </div>
          <div className="flex justify-center mt-3">
            
          <button className='
          border border-[#13304D]
          bg-[#13304D] 
          text-white rounded-full
          px-5 py-2 hover:bg-white 
          hover:text-[#13304D] '
          onClick={save_payment}
          >
            CHECKOUT
          </button>
          <button className='
          border border-red-300 ml-3
          text-red-400 rounded-full
          px-5 py-2 hover:bg-red-500
          hover:text-[white] '
          onClick={reset}
          >
            RESET
          </button>
          </div>
        </div>
      </div>

      
    </>
  );
}
