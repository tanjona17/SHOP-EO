"use client";

import React from "react";
import "preline/dist/preline.js";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import  trigger, { mutate }  from "swr";
import useSWR from "swr";

export default function Page() {
  const fetcher = (...args: [any]) => fetch(...args).then((res) => res.json());
  const { data, error } = useSWR(
    `http://localhost:1234/api/product/`,
    fetcher
  );

  const new_product = useFormik({
    initialValues: {
      product_name: "",
      descri: "",
      img: null,
      price: 0,
    },
    validationSchema: Yup.object({
      product_name: Yup.string().required("Required"),
      descri: Yup.string().required("Required"),
      img: Yup.mixed().required("Required"),
      price: Yup.number().required("Required"),
    }),
    onSubmit: async (values, actions) => {
      const form_data = new FormData();
      form_data.append("product_name", values.product_name);
      form_data.append("descri", values.descri);
      form_data.append("img", values.img);
      form_data.append("price", values.price);
        try {

        await axios.post("http://localhost:1234/api/product/register", form_data);
        mutate("http://localhost:1234/api/product/")
        actions.resetForm();
        
      } catch (error) {
        console.error("Error during insertion:", error);
      }
      console.log(values);
      
  }
});

  return (
    <>
      <div className="px-[60px] pt-3 mt-20   lg:ml-[280px] sm:ml-0 h-screen w-full">
        <h1>Add new product</h1>
        <form onSubmit={new_product.handleSubmit} className="flex justify-center flex-col w-[80%]  bg-white px-10 pt-10 shadow-lg rounded-[9px] mt-3 ">
          <div className="grid grid-cols-2 -mx-3 mb-6">
            <div className=" px-3 mb-6 md:mb-0">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="grid-first-name"
              >
                Product Name
              </label>
              <input
                className={
                  new_product.errors.product_name && new_product.touched.product_name ?" bg-gray-50 border border-red-500 text-gray-900 text-sm rounded-lg focus:ring-red-600 focus:border-red-600 block w-full p-2.5"
                  : "appearance-none block w-full  text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                }
                value={new_product.values.product_name}
                onChange={new_product.handleChange}
                onBlur={new_product.handleBlur}
                name="product_name"
                type="text"
                placeholder="Produdct name"
              />
              {new_product.errors.product_name && new_product.touched.product_name ? (
                    <p className="text-red-500 text-sm">
                      {new_product.errors.product_name}
                    </p>
                  ) : (
                    ''
                  )}
            </div>
            
            <div className=" px-3 mb-6 md:mb-0">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="grid-first-name"
              >
                Product price
              </label>
              <input
                className={
                  new_product.errors.price && new_product.touched.price ?" bg-gray-50 border border-red-500 text-gray-900 text-sm rounded-lg focus:ring-red-600 focus:border-red-600 block w-full p-2.5"
                  : "appearance-none block w-full  text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                }
                value={new_product.values.price}
                onChange={new_product.handleChange}
                onBlur={new_product.handleBlur}
                name="price"
                type="text"
                placeholder="Produdct price"
              />
              {new_product.errors.price && new_product.touched.price ? (
                    <p className="text-red-500 text-sm">
                      {new_product.errors.price}
                    </p>
                  ) : (
                    ''
                  )}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-7">
            <div>
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="grid-first-name"
              >
                Product description
              </label>
              <input
               className={
                new_product.errors.descri && new_product.touched.descri ?" bg-gray-50 border border-red-500 text-gray-900 text-sm rounded-lg focus:ring-red-600 focus:border-red-600 block w-full p-2.5 h-[130px]"
                : "appearance-none block w-full  text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 h-[130px]"
              }
              value={new_product.values.descri}
              onChange={new_product.handleChange}
              onBlur={new_product.handleBlur}
              name="descri"
              type="text"
              placeholder="Produdct description"
            />
            {new_product.errors.descri && new_product.touched.descri ? (
                  <p className="text-red-500 text-sm">
                    {new_product.errors.descri}
                  </p>
                ) : (
                  ''
                )}
            </div>
            <div>
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="grid-first-name"
              >
                Product image
              </label>
              <label
                htmlFor="img"
                className="flex flex-col items-center justify-center w-full h-[130px] border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50  hover:bg-gray-100 "
              >
                <div className="flex flex-col items-center justify-center pt-5 pb-6 ">
                  <svg
                    className="w-8 h-8 mb-4 text-gray-500 "
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 16"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                    />
                  </svg>
                  <p className="mb-2 text-sm text-gray-500 ">
                    <span className="font-semibold">Click to upload</span> or
                    drag and drop
                  </p>
                  <p className="text-xs text-gray-500 ">
                    SVG, PNG, JPG or GIF (MAX. 800x400px)
                  </p>
                </div>
                <input name="img" id="img" type="file" className="hidden"
                    
                    onChange={(e) =>{ new_product.setFieldValue("img",e.target.files[0])}}
                    onBlur={new_product.handleBlur} />
              </label>
              {new_product.errors.img && new_product.touched.img ? (
                    <p className="text-red-500 text-sm">{new_product.errors.img}</p>
                  ) : (
                    ''
                  )}
            </div>
          </div>
          <div className="flex justify-center mt-6 mb-10">
            <button type="submit" className=" bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg"  >
             Add
            </button>
            <button className="ml-5 opacity-75 hover:bg-red-500 text-red-400 font-semibold hover:text-white py-2 px-4 border border-red-400 hover:border-transparent rounded-lg">
             Cancel
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
