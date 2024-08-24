"use client";
import axios from "axios";
import { useFormik } from "formik";
import Link from "next/link";
import React from "react";
import * as Yup from "yup";
export default function Create_account() {
    const new_customer  = useFormik({
        initialValues:{
            username :"",
            email:"",
            password:"",
        },
        validationSchema: Yup.object({
            username: Yup.string().required("Username is required"),
            email: Yup.string().required("Email is required"),
            password: Yup.string().required("Password is required"),
        }),
        onSubmit: async (values, actions) =>{
            try {
                await axios.post("http://localhost:1234/api/auth/register", values);
                actions.resetForm();
                alert("Account created")
                
            } catch (error) {
                console.log(error);
                
            }
        }

    })


  return (
    <div className="flex justify-center w-screen h-screen items-center">
      <div
        className="
    grid grid-cols-2
    w-[750px] h-[450px] 
    rounded-[10px]
    bg-[#5B6EE8]"
      >
        <div className="flex justify-center items-center w-full h-full">
          <div className="text-white font-bold">
            <p className="text-[30px]">
              JOIN US{" "}
              <span className="text-[20px]">
                and
                <br />
                FIND YOUR PRODUCTS
              </span>{" "}
            </p>
          </div>
        </div>
        <div
          className="
        bg-white w-full h-full 
        rounded-tr-[9px] rounded-tl-[35px] 
        rounded-bl-[35px] rounded-br-[9px]  "
        >
          <div className="flex flex-col  justify-center items-center w-full h-[420px] ">
            <form onSubmit={new_customer.handleSubmit}>
            <div
              className="
                flex justify-center mb-7
                text-[24px] font-bold text-[#13304D]"
            >
              <h1>Create account</h1>
            </div>
            <div className="">
              <input
                type="text"
                className={
                new_customer.errors.username && new_customer.touched.username ? 
                    " w-[270px] py-2 px-3 text-[12px]shadow-lg border-[#e6e6e6]focus:outline-none rounded-full border-red-500 focus:ring-red-600 focus:border-red-600"
                    : "w-[270px] py-2 px-3 text-[12px]shadow-lg border-[#e6e6e6]focus:outline-none rounded-full "
                }
                name="username"
                value={new_customer.values.username}
                placeholder="Username"
                onChange={new_customer.handleChange}
                onBlur={new_customer.handleBlur}
              />
               {new_customer.errors.username && new_customer.touched.username ? (
                    <p className="text-red-500 text-sm ml-1">
                      {new_customer.errors.username}
                    </p>
                  ) : (
                    ''
                  )}
            </div>
            <div className=" mt-5">
              <input
                type="text"
                className={
                    new_customer.errors.email && new_customer.touched.email ? 
                        " w-[270px] py-2 px-3 text-[12px]shadow-lg border-[#e6e6e6]focus:outline-none rounded-full border-red-500 focus:ring-red-600 focus:border-red-600"
                        : "w-[270px] py-2 px-3 text-[12px]shadow-lg border-[#e6e6e6]focus:outline-none rounded-full "
                    }
                name="email"
                placeholder="Email"
                onChange={new_customer.handleChange}
                onBlur={new_customer.handleBlur}
              />
              {new_customer.errors.email && new_customer.touched.email ? (
                    <p className="text-red-500 text-sm ml-1">
                      {new_customer.errors.email}
                    </p>
                  ) : (
                    ''
                  )}
            </div>
            <div className=" mt-5">
              <input
                type="password"
                className={
                    new_customer.errors.password && new_customer.touched.password ? 
                        " w-[270px] py-2 px-3 text-[12px]shadow-lg border-[#e6e6e6]focus:outline-none rounded-full border-red-500 focus:ring-red-600 focus:border-red-600"
                        : "w-[270px] py-2 px-3 text-[12px]shadow-lg border-[#e6e6e6]focus:outline-none rounded-full "
                    }
                name="password"
                placeholder="Password"
                onChange={new_customer.handleChange}
                onBlur={new_customer.handleBlur}
              />
               {new_customer.errors.password && new_customer.touched.password ? (
                    <p className="text-red-500 text-sm ml-1">
                      {new_customer.errors.password}
                    </p>
                  ) : (
                    ''
                  )}
            </div>
            <div className="flex justify-center">
              <button
                className="
                        bg-[#5B6EE8] font-normal
                        rounded-full text-white 
                        px-5 py-2 mt-5"
              >
                Create
              </button>
            </div>
            </form>
          </div>
          <p className="text-[12px] ml-10">
            Already have an account ?{" "}
            <span>
              <Link href="/login" className="text-[#5B6EE8]">
                Log in
              </Link>
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
