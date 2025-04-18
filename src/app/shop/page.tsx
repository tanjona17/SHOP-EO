"use client";
import React, { useContext, useEffect, useState } from "react";

import Products_catalogs from "../components/Products_catalogs";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Field,
  Label,
  Transition,
} from "@headlessui/react";
import { XMarkIcon, ChevronDownIcon } from "@heroicons/react/24/solid";
import { Slider, SliderChangeEvent } from "primereact/slider";
import { Checkbox, CheckboxChangeEvent } from "primereact/checkbox";
import { useRouter, useSearchParams } from "next/navigation";
import { useDispatch, useSelector } from 'react-redux';
import { add_product } from '@/redux/cart_redux';
import useSWR, { mutate } from "swr";
import Navbar from "../components/Navbar";
import { ProgressSpinner } from "primereact/progressspinner";
const fetcher = (...args: [any] ) => fetch(...args).then( (res) => res.json());


export default function Page() {

  const router = useRouter();
  // ["accessories", "shoes", "fashion", "cosmetics",""];
  console.log(router);
  

  const [price, set_price] = useState<number[]>([20, 500]);

  const q = useSearchParams().get('q') || "";


  const [selected_categories, set_categories] = useState<string[]>([]);
  const options = ["accessories", "shoes", "fashion", "cosmetics","woman"];
  const filters = selected_categories.join(",");

   
  const dispatch = useDispatch();
 
  const handle_checkbox = (e: CheckboxChangeEvent) => {
    const value: string = e.target.value;
    if (e.target.checked) {
      set_categories([...selected_categories, value]);
    } else {
      set_categories(selected_categories.filter((item) => item !== value));
    }
  };

    const build_url = () => {
    let baseURL = "http://localhost:1234/api/product?";
    
    if (q) {
      baseURL += `q=${q}&`;
    }
    if (selected_categories) {
      baseURL += `categories=${selected_categories}&`;
    }
  
    if (price) {
      baseURL += `price=${price}&`;
    }
  
    return baseURL.slice(0, -1); // Removes the trailing '&' or '?' if no params
  };
  
  const { data, error } = useSWR(build_url(), fetcher, {
    revalidateOnFocus: true,
  });
  console.log(build_url());
  // const {data, error} = useSWR(`http://localhost:1234/api/product?categories=${selected_categories}&price=${price}`, fetcher,{
  //   revalidateOnFocus: true
  // });
  // useEffect(() => {

  //     ? router.push("http://localhost:3000/shop")   
  //     : router.replace(`http://localhost:3000/shop?q=${q}&categories=${selected_categories}&price=${price}`);   
      
      
      
  // }, [selected_categories,price, router,q]);
  useEffect(() => {
    let query = ``;

    if (q) {
      query += `q=${q}`;
    }
  
    if (selected_categories.length > 0) {
      query += `&categories=${selected_categories}`;
    }
  
    if (price) {
      query += `&price=${price}`;
    }
  
 
      router.replace(`http://localhost:3000/shop?${query}`);
    
  

    
  }, [selected_categories, price, router, q]);
  


  

   
 
  return (
    <>
      <Navbar title={"Shop-Eo"} />
      <div className="flex gap-5 mt-5  ">
        <div id="hs-offcanvas-example" className="hs-overlay overflow-x-hidden [--auto-close:lg] overflow-y-hidden hs-overlay-open:translate-x-0 -translate-x-full transition-all duration-300 transform hidden fixed top-[70px] start-0 bottom-0 z-[60] w-64 bg-white border-e border-gray-200 pt-7 pb-10 lg:block lg:translate-x-0 lg:end-auto lg:bottom-0 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-track]:bg-neutral-700 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500 dark:bg-neutral-800 dark:border-neutral-700" role="dialog" tabIndex={-1} aria-label="Sidebar">
      <div className="bg-white w-[250px]  ml-3 rounded-[15px] pt-3 px-3 h-screen">
        <p className="text-[#13304D] font-bold text-[20px] text-center flex justify-start">
          Filter
        
        </p>
        <Disclosure>
          <DisclosureButton className="flex justify-between w-50 items-center w-full p-2 mt-5 text-base text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 font-semibold ">
            Categories
  
            <ChevronDownIcon className="w-5 ml-5 group-data-[open]:rotate-180" />
          </DisclosureButton>
          <Transition
            enter="duration-200 ease-out"
            enterFrom="opacity-0 -translate-y-6"
            enterTo="opacity-100 translate-y-0"
            leave="duration-300 eae-out"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 -translate-y-6"
          >
            <DisclosurePanel className="text-gray-500 transition">
              <Field>
                {options.map((option) => {
                  return (
                    <div key={option} className="flex items-center">
                      <Checkbox
                        name="option"
                        value={option}
                        onChange={handle_checkbox}
                        checked={selected_categories.some(
                          (item) => item === option
                        )}
                      />
                      <label className="ml-1" htmlFor={option}>{option }</label>
                    </div>
                  );
                })}
              </Field>
            </DisclosurePanel>
          </Transition>
        </Disclosure>
        <Disclosure>
          <DisclosureButton className="flex justify-between w-50 items-center w-full p-2 mt-5 text-base text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 font-semibold ">
            Prices
            <ChevronDownIcon className="w-5 ml-5 group-data-[open]:rotate-180" />
          </DisclosureButton>
          <Transition
            enter="duration-200 ease-out"
            enterFrom="opacity-0 -translate-y-6"
            enterTo="opacity-100 translate-y-0"
            leave="duration-300 eae-out"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 -translate-y-6"
          >
            <DisclosurePanel className="text-gray-500 transition  w-full">
              <Field>
                <div className="">
                  <div className="flex justify-between px-2">
                    <div>
                      <p>${price[0]}</p>
                    </div>
                    <div>
                      <p>${price[1]}</p>
                    </div>
                  </div>
                  <div className="w-50 mt-2">
                    <Slider
                      value={price}
                      onChange={(e: SliderChangeEvent) => set_price(e.value)}
                      max={1200}
                      step={10}
                      range
                    />
                  </div>
                </div>
              </Field>
            </DisclosurePanel>
          </Transition>
        </Disclosure>
      </div>
    </div>
        <div className="bg-white w-full  h-screen rounded-[15px]">
          {/* {is_loading ? <div className='mt-20 w-full text-center col-span-3'> <ProgressSpinner style={{width:'50px', height: "50px"}} strokeWidth="8"  fill="var(--surface-ground)"/> </div> : */}
          <Products_catalogs data={data} error={error}  />
        {/* } */}
        </div>
      </div>

      {/* <div className='mt-10 w-25'>
  <div className='flex w-full justify-between'>
    <div>
      <p>{value[0]}</p>
    </div>
    <div>
      <p>{value[1]}</p>
    </div>


  </div>
  <Slider value={value} onChange={ (e: SliderChangeEvent) => set_value(e.value)} range />
</div> */}
    </>
  );
}
