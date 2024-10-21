import { Bars3BottomLeftIcon } from '@heroicons/react/24/outline'
import React from 'react'

export default function Side_bar() {
  return <>
   <div className="py-16 text-center"> 
       <button type="button" className="py-2 px-3 inline-flex justify-center items-center gap-x-2 text-start bg-gray-800 border border-gray-800 text-white text-sm font-medium rounded-lg shadow-sm align-middle hover:bg-gray-950 focus:outline-none focus:bg-gray-900 dark:bg-white dark:text-neutral-800 dark:hover:bg-neutral-200 dark:focus:bg-neutral-200" aria-haspopup="dialog" aria-expanded="false" aria-controls="hs-offcanvas-example" aria-label="Toggle navigation" data-hs-overlay="#hs-offcanvas-example">
        Open
      </button> 
       <Bars3BottomLeftIcon/> 
   </div> 
   
    <div id="hs-offcanvas-example" className="hs-overlay [--auto-close:lg] hs-overlay-open:translate-x-0 -translate-x-full transition-all duration-300 transform hidden fixed top-[70px] start-0 bottom-0 z-[60] w-64 bg-white border-e border-gray-200 pt-7 pb-10 overflow-y-auto lg:block lg:translate-x-0 lg:end-auto lg:bottom-0 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-track]:bg-neutral-700 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500 dark:bg-neutral-800 dark:border-neutral-700" role="dialog" tabIndex={-1} aria-label="Sidebar">
      <div className="bg-white w-[350px]  ml-3 rounded-[15px] pt-3 px-3 h-screen">
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
              {/* <Field>
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
              </Field> */}
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
            <DisclosurePanel className="text-gray-500 transition">
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
  </>
}
