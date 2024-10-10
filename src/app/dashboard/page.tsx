"use client";

import {
  ShoppingCartIcon,
  UserIcon,
  CurrencyDollarIcon,
} from "@heroicons/react/24/outline";

import React, { use, useEffect, useState } from "react";
import "preline/dist/preline.js";
import "flowbite/dist/flowbite.min.js";
import Navbar from "../components/Navbar";
import Side_bar from "../components/Side_bar";
import Line_chart from "../components/Line_chart";
import Apex_line from "../components/Apex_line";
import { useRouter } from "next/navigation";
import useSWR from "swr";
import { Product_type } from "../types/products_type";
import { User } from "../types/users_type";
import { TOKEN } from "@/redux/api";
import { ArrowDownIcon, ArrowUpIcon } from "@heroicons/react/24/solid";

const fetcher = (...args: [any]) =>
  fetch(...args, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      token: `Bearer ${TOKEN}`,
    },
  }).then((res) => res.json());

export default function Page() {
  const [inc, set_income] = useState();
  const [index, set_index] = useState(false);
  const [key, set_key] = useState(1);
  const [sales_percentage, set_perc] = useState(0);
  const [q_percentage, set_q] = useState(0);

  const { data: users, error: users_error } = useSWR(
    `http://localhost:1234/api/user?new=true`,
    fetcher,
    {
      revalidateOnFocus: false,
    }
  );
  const { data: count, error: count_error } = useSWR(
    `http://localhost:1234/api/user?count=true`,
    fetcher,
    {
      revalidateOnFocus: false,
    }
  );
  const { data: products, error: products_error } = useSWR(
    `http://localhost:1234/api/product?new=true`,
    fetcher,
    {
      revalidateOnFocus: false,
    }
  );
  const { data: income, error: revenue_error } = useSWR(
    `http://localhost:1234/api/product/income`,
    fetcher,
    {
      revalidateOnFocus: false,
    }
  );

  console.log(income);

  useEffect(() => {
    set_income(income);
    if (income && income.length >= 2) {

      const sales_percentage = (( income[1].total -  income[0].total) /  income[0].total) * 100;
      const q_percentage = (( income[1].q -  income[0].q) /  income[0].q) * 100;

      set_perc(sales_percentage);
      set_q(q_percentage);
    } else {
      set_perc(0);
    }
  }, [inc, income]);

  const last_month = () => {
    set_index(true);
    set_key(0);
  };

  return (
    <>
      <Navbar title={"ShopAdmin"} />

      <Side_bar />

      <div className="px-[60px] lg:mt-[100px] sm:mt-10    lg:ml-[280px] sm:ml-0 h-screen">
        <div className="grid grid-cols-2 gap-14 mb-4  ">
          <div className="bg-white rounded-[9px] px-5 py-3 shadow-lg ">
            <div className="flex">
              <h1 className="">Revenue | </h1>
              <button className="ml-1" onClick={last_month}>
                month
              </button>
            </div>
            <div className="flex flex-row mt-5">
              <div className="bg-blue-500 rounded-full p-3">
                <CurrencyDollarIcon className="h-10 w-10" />
              </div>
              <div className="text-[30px]">
                {inc ? (
                  <p key={inc[key]._id} className="text-[30px]">
                    ${inc[key].total}
                  </p>
                ) : (
                  ""
                )}
                <div className="flex">
                  {Math.floor(sales_percentage)}%
                  {sales_percentage > 0 ? (
                    <div className="flex">
                      <ArrowUpIcon
                        className="h-10 w-10"
                        textAnchor="increase"
                      />{" "}
                      <p>incrase</p>
                    </div>
                  ) : (
                    <div className="flex">
                      <ArrowDownIcon className="h-10 w-10" /> <p>decrease</p>
                    </div>
                  )}
                </div>
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
                {inc ? (
                  <p key={inc[key]} className="text-[30px]">
                    {inc[key].q}
                  </p>
                ) : (
                  ""
                )}
                <div className="flex">
                  {Math.floor(sales_percentage)}%
                  {q_percentage > 0 ? (
                    <div className="flex">
                      <ArrowUpIcon
                        className="h-10 w-10"
                        textAnchor="increase"
                      />{" "}
                      <p>incrase</p>
                    </div>
                  ) : (
                    <div className="flex">
                      <ArrowDownIcon className="h-10 w-10" /> <p>decrease</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-14 mb-4  ">
          <div className="bg-white rounded-[9px] px-5 py-3 shadow-lg ">
            <h1 className="">Customers </h1>
            <div className="flex flex-row mt-5">
              <div className="bg-blue-500 rounded-full p-3">
                <UserIcon className="h-10 w-10" />
              </div>
              <div className="text-[30px]">
                <p className="text-[30px]">{count}</p>
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
            {users
              ? users.map((user: User) => {
                  return (
                    <div
                      className="flex px-7 mb-7 align-c justify-between  border-b-2 border-gray-200"
                      key={user._id}
                    >
                      <div className="py-3 ">
                        <img
                          className="w-10 h-10 rounded-full"
                          src="/user.jpg"
                          alt="user photo"
                        />
                      </div>

                      <div className=" pt-5">
                        <p>
                          {user.username} | {user.email}{" "}
                        </p>
                      </div>
                      <div className="flex justify-center py-3">
                        <button className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded-full">
                          Show
                        </button>
                      </div>
                    </div>
                  );
                })
              : ""}
          </div>
          <div className="bg-white  px-5 py-5 mt-3 overflow-y-scroll [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-track]:bg-neutral-700 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500">
            <h1>Latest products</h1>
            {/* <div className="flex px-7 mb-7 align-c justify-between  border-b-2 border-gray-200">
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
            </div> */}

            {products
              ? products.map((prod: Product_type) => {
                  return (
                    <div
                      className="flex px-7 mb-7 align-c justify-between  border-b-2 border-gray-200"
                      key={prod._id}
                    >
                      <div className="py-3 ">
                        <img
                          className="w-10 h-10 rounded-full"
                          src="/user.jpg"
                          alt="user photo"
                        />
                      </div>

                      <div className=" pt-5">
                        <p>{prod.product_name} </p>
                      </div>
                      <div className="flex justify-center py-3">
                        <button className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded-full">
                          Show
                        </button>
                      </div>
                    </div>
                  );
                })
              : ""}
          </div>
        </div>
      </div>
    </>
  );
}
