"use client";
import {
  ArrowLeftEndOnRectangleIcon,
  MagnifyingGlassIcon,
  ShoppingCartIcon,
} from "@heroicons/react/24/solid";
import Image from "next/image";
import React from "react";
import "/node_modules/flowbite/dist/flowbite.min.js";
import Link from "next/link";
import { useSelector } from "react-redux";
import { Bars3BottomLeftIcon } from "@heroicons/react/24/outline";

interface Props {
  title: string;
}

export default function Navbar(props: Props) {
  const cart = useSelector((state) => state.cart);
  const quantity = useSelector((state) => state.cart.quantity);
  const price = useSelector((state) => state.cart.total_price);

  return (
    <>
      <div className="fixed top-0 z-50 w-full grid grid-cols-3 px-[50px] items-center py-3 bg-white">
        <div className="font-bold text-[#13304D] text-[20px] flex">
          <button
            type="button"
            className="py-2 px-3 inline-flex justify-center items-center gap-x-2 lg:hidden"
            aria-haspopup="dialog"
            aria-expanded="false"
            aria-controls="hs-offcanvas-example"
            aria-label="Toggle navigation"
            data-hs-overlay="#hs-offcanvas-example"
          >
            <Bars3BottomLeftIcon className="w-[25px] ml-5" />
          </button>
          <h1 className="lg:block sm:hidden">{props.title}</h1>
        </div>

        <div className="flex">
          <input
            type="text"
            className="
                    w-[350px] py-2 px-3
                    border-1 border-gray-400 
                    focus:outline-none rounded-sm
                    focus:border-[#5B6EE8]"
            placeholder="Search for products"
          />
          <button className=" bg-[#5B6EE8] px-2 text-white rounded-tr-sm rounded-br-sm">
            <MagnifyingGlassIcon className="w-[25px] " />
          </button>
        </div>
        <div className="flex justify-end">
          <Link href={"/cart"}>
            <button className="py-2 px-2 mr-3 flex text-[#13304D]">
              <ShoppingCartIcon className="w-[30px] " />
              <p className="bg-red-500 text-white mt-[-10px] ml-[-7px] w-7 rounded-full">
                {quantity}
              </p>
            </button>
          </Link>
          <div className="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
            <button
              type="button"
              className="flex text-sm bg-gray-800 rounded-full md:me-0 "
              aria-expanded="false"
              data-dropdown-toggle="user-dropdown"
              data-dropdown-placement="bottom"
            >
              <img
                className="w-7 h-7 rounded-full"
                src="/user.jpg"
                alt="user photo"
              />
            </button>
            <div
              className="z-50 hidden my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow "
              id="user-dropdown"
            >
              <div className="px-4 py-3">
                <span className="block text-sm text-gray-900">
                  Bonnie Green
                </span>
                <span className="block text-sm flex  mt-3 text-gray-500 truncate">
                  <ArrowLeftEndOnRectangleIcon className="w-6 h-6" />
                  <a href="#" className="ml-2">
                    Log out
                  </a>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
