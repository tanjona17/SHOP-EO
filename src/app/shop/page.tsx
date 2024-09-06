"use client";
import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Products_catalogs from "../components/Products_catalogs";
import {
  Checkbox,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Field,
  Label,
  Transition,
} from "@headlessui/react";
import { XMarkIcon, ChevronDownIcon } from "@heroicons/react/24/solid";
import { Slider, SliderChangeEvent } from "primereact/slider";
export default function Page() {
  const [value, set_value] = useState<number[]>([10, 100]);
  console.log(value);

  return (
    <>
      <Navbar title={"Shop-Eo"} />
      <div className="flex gap-5 mt-5 h-screen ">
        <div className="bg-white w-[350px]  ml-3 rounded-[15px] pt-3 px-3">
          <p className="text-[#13304D] font-bold text-[20px] text-center">
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
                  <div className="flex items-center">
                    <Checkbox
                      defaultChecked={false}
                      value=""
                      name=""
                      className="group block size-4 rounded border bg-white data-[checked]:bg-blue-500"
                    >
                      <svg
                        className="stroke-white opacity-0 group-data-[checked]:opacity-100"
                        viewBox="0 0 14 14"
                        fill="none"
                      >
                        <path
                          d="M3 8L6 11L11 3.5"
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </Checkbox>
                    <Label className="ml-3 font-normal text-gray-700">
                      Accessories
                    </Label>
                  </div>
                  <div className="flex items-center">
                    <Checkbox
                      defaultChecked={false}
                      value=""
                      name=""
                      className="group block size-4 rounded border bg-white data-[checked]:bg-blue-500"
                    >
                      <svg
                        className="stroke-white opacity-0 group-data-[checked]:opacity-100"
                        viewBox="0 0 14 14"
                        fill="none"
                      >
                        <path
                          d="M3 8L6 11L11 3.5"
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </Checkbox>
                    <Label className="ml-3 font-normal text-gray-700">
                      Shoes
                    </Label>
                  </div>
                  <div className="flex items-center">
                    <Checkbox
                      defaultChecked={false}
                      value=""
                      name=""
                      className="group block size-4 rounded border bg-white data-[checked]:bg-blue-500"
                    >
                      <svg
                        className="stroke-white opacity-0 group-data-[checked]:opacity-100"
                        viewBox="0 0 14 14"
                        fill="none"
                      >
                        <path
                          d="M3 8L6 11L11 3.5"
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </Checkbox>
                    <Label className="ml-3 font-normal text-gray-700">
                      Fashion
                    </Label>
                  </div>
                  <div className="flex items-center">
                    <Checkbox
                      defaultChecked={false}
                      value=""
                      name=""
                      className="group block size-4 rounded border bg-white data-[checked]:bg-blue-500"
                    >
                      <svg
                        className="stroke-white opacity-0 group-data-[checked]:opacity-100"
                        viewBox="0 0 14 14"
                        fill="none"
                      >
                        <path
                          d="M3 8L6 11L11 3.5"
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </Checkbox>
                    <Label className="ml-3 font-normal text-gray-700">
                      Cosmetics
                    </Label>
                  </div>
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
              <DisclosurePanel className="text-gray-500 transition">
                <Field>
                  <div className="">
                    <div className="flex justify-between px-2">
                      <div>
                        <p>${value[0]}</p>
                      </div>
                      <div>
                        <p>${value[1]}</p>
                      </div>
                    </div>
                    <div className="w-50 mt-2">
                    <Slider
                      value={value}
                      onChange={(e: SliderChangeEvent) => set_value(e.value)}
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
        <div className="bg-white w-full rounded-[15px]">
          <Products_catalogs />
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
