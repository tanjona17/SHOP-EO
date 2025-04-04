"use client";
import {
  ArrowLeftEndOnRectangleIcon,
  MagnifyingGlassIcon,
  ShoppingCartIcon,
} from "@heroicons/react/24/solid";
import Image from "next/image";
import React, { ChangeEvent, createContext, useContext, useState } from "react";
import "/node_modules/flowbite/dist/flowbite.min.js";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { Bars3BottomLeftIcon } from "@heroicons/react/24/outline";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

interface Props {
  title: string;
}

export default function Navbar(props: Props) {
  const quantity = useSelector((state) => state.cart.quantity);
  const router = useRouter();
  const [search, set_input] = useState("");
  const url_path = usePathname();
  const s = useSearchParams();
  const categories = s.get("categories") || "";
  const price = s.get("price  ") || "";
  const new_url =
    url_path + `?q=${search}&categories=${categories}&price=${price}`;
  console.log(new_url);

  const handle_click = () => {
    router.replace(new_url);
  };

  const log_out = () => {
    localStorage.clear();
    router.push("/");
  };

  return (
    <>
      <div className="fixed top-0 z-50  grid grid-cols-3  md:px-[50px] sm:px-[10px] items-center py-3 bg-white w-full min-w-[500px]">
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

        <div className="flex sm:ml-[-70px]">
          <input
            type="text"
            onChange={(e) => set_input(e.target.value)}
            className="
                    w-[350px] py-2 px-3
                    border-1 border-gray-400 
                    focus:outline-none rounded-sm
                    focus:border-[#5B6EE8]"
            placeholder="Search for products"
            value={search}
          />
          <button
            className=" bg-[#5B6EE8] px-2 text-white rounded-tr-sm rounded-br-sm"
            onClick={handle_click}
          >
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
                  <button className="ml-2" onClick={log_out}>
                    Log out
                  </button>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
