"use client";

import { ShoppingCartIcon } from "@heroicons/react/24/outline";

import React from "react";
import "preline/dist/preline.js";
import "flowbite/dist/flowbite.min.js";
import Navbar from "../components/Navbar";
import Side_bar from "../components/Side_bar";
import Line_chart from "../components/Line_chart";
import Apex_line from "../components/Apex_line";
import { useRouter } from "next/navigation";

export default function Page() {
  return (
    <>
      <Navbar title={"ShopAdmin"} />

      <Side_bar />

      <div className="px-[60px] pt-3    lg:ml-[280px] sm:ml-0 h-screen">
        <div className="grid grid-cols-2 gap-14 mb-4  ">
          <div className="bg-white rounded-[9px] px-5 py-3 shadow-lg ">
            <h1 className="">Sales</h1>
            <div className="flex flex-row mt-5">
              <div className="bg-blue-500 rounded-full p-3">
                <ShoppingCartIcon className="h-10 w-10" />
              </div>
              <div className="text-[30px]">
                <p className="text-[30px]">$17953</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-[9px] px-5 py-5 shadow-lg">
            <h1 className="">Sales</h1>
            <div className="flex flex-row mt-5">
              <div className="bg-blue-500 rounded-full p-3">
                <ShoppingCartIcon className="h-10 w-10" />
              </div>
              <div className="text-[30px]">
                <p className="text-[30px]">$17953</p>
              </div>
            </div>
          </div>
        </div>
        <Apex_line />
        <div className="grid grid-cols-2 gap-14 mb-4 h-[350px] mt-[40px]  ">
          <div className="bg-white  px-5 py-5 mt-3 overflow-y-scroll [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-track]:bg-neutral-700 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500">
            <h1>New members</h1>
            <div className="flex px-7 mb-7 align-c justify-between  border-b-2 border-gray-200">
              <div className="py-3 ">
                <img
                  className="w-10 h-10 rounded-full"
                  src="/user.jpg"
                  alt="user photo"
                />
              </div>

              <div className=" pt-5">
                <p>Jhon | Jhon@gmail.com </p>
              </div>
              <div className="flex justify-center py-3">
                <button className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded-full">
                  Show
                </button>
              </div>
            </div>
          </div>
          <div className="bg-white  px-5 py-5 mt-3 overflow-y-scroll [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-track]:bg-neutral-700 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500">
            <h1>Latest products</h1>
            <div className="flex px-7 mb-7 align-c justify-between  border-b-2 border-gray-200">
              <div className="py-3 ">
                <img
                  className="w-10 h-10 rounded-full"
                  src="/user.jpg"
                  alt="user photo"
                />
              </div>

              <div className=" pt-5">
                <p>Jhon | Jhon@gmail.com </p>
              </div>
              <div className="flex justify-center py-3">
                <button className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded-full">
                  Show
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
