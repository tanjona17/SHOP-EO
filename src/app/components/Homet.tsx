"use client";
import Image from "next/image";
import React from "react";
import Footer from "./Footer";
import { MapPinIcon, PhoneIcon, EnvelopeIcon } from "@heroicons/react/24/solid";
import Products_catalogs from "./Products_catalogs";
import Link from "next/link";
import { useSelector } from "react-redux";
import { useFormik } from "formik";
import axios from "axios";
import useSWR from "swr";
import { Product_type } from "../types/products_type";
import Carousel from "./Carousel";


const fetcher = (...args: [any]) => fetch(...args).then((res) => res.json());
export default function Home() {
  const { data, error } = useSWR(
    `http://localhost:1234/api/product?new=true`,
    fetcher,
    {
      revalidateOnFocus: true,
    }
  );

  const new_message = useFormik({
    initialValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
    onSubmit: (values, actions) => {
      axios.post("http://localhost:1234/api/message", values);
      actions.resetForm();
    },
  });
  const productTemplate = (x: Product_type) => {
   
        return (
        
        <div className="   
        w-[250px] bg-white
        overflow-hidden shadow-lg 
        rounded-tr-[7px] rounded-tl-[7px] 
        rounded-br-[15px] rounded-bl-[15px]
        animate__animated animate__pulse 
        mt-5"
        key={x._id}>
          <div className='flex w-[250px] h-[250px] justify-center p-3'>
          <Image src={`/db_images/${x.img}`} width={1200} height={100}  alt="product image"/>
          </div>
       
        <div className="px-3 py-4">
          <div className=" flex justify-between font-bold text-md text-[#13304D] mb-2 px-3">
            <p>{x.product_name} </p>
            <p>{x.price}</p>
          </div>
        </div>  
        <div className="flex justify-center mb-5">
         <Link href={`/detail?id=${x._id}`}>
          <button className='
          border border-[#13304D] 
          text-[#13304D] rounded-full
          px-5 py-2 hover:bg-[#13304D] 
          hover:text-white'>
            More details
          </button>
          </Link>
         
        </div>
        </div>
        )
        
      }



  return (
    <>
      <header className="">
        <div className="grid grid-cols-2 ">
        <div>
        <p
          className="
          font-bold text-[#13304D]
          text-[16px] mt-2 ml-3
          "
        >
              Shop-Eo
            </p>
        </div>
            <div className=" flex justify-end">
              <Link href={"/login"}>
                <button
                  className="
                mr-5 px-5 py-1 mt-2
             bg-white  
                rounded-[5px] text-[#13304D]"
                >
                  Log in
                </button>
              </Link>
            </div>
        </div>
        <div className=" grid md:grid-cols-2 sm:grid-cols-1 bg-white">
          <div className="">
         
            <div className="pl-[150px] pt-[90px] bg-white">
              <h1 className="text-[#13304D] font-bold text-[35px]">
                Find,Buy your
                <br />
                dream
                <br /> product here
              </h1>
              <div className="mt-5 ">
                <Link href={"/shop"}>
                  <button
                    className="
                  bg-[#5B6EE8] font-bold
                    rounded-full text-white 
                    px-7 py-2"
                  >
                    Shop now
                  </button>
                </Link>
              </div>
            </div>
          </div>

          <div
            className="
            bg-[#5B6EE8] h-[400px] 
            rounded-tl-full
            rounded-bl-full"
          >
            {/* <div className=" flex justify-end">
              <Link href={"/login"}>
                <button
                  className="
                mr-5 px-5 py-1 mt-2
             bg-white  
                rounded-[5px] text-[#13304D]"
                >
                  Log in
                </button>
              </Link>
            </div> */}

            <div
              className="  
               flex justify-center 
                px-[100px] py-[60px]"
            >
              <img className="w-100" src="hero-img.png" alt="" />
            </div>
          </div>
        </div>
      </header>
      <p
        className="
        mt-10 ml-10
        text-[#13304D] font-semibold
        "
      >
        Explore our products
      </p>
      {/* <Products_catalogs data={data} error={error} /> */}
      <div className="card">
            <Carousel/>
        </div>
      <p
        className="
        mt-10 ml-10
        text-[#13304D] font-semibold
        "
      >
        Our top product
      </p>
      <div className="grid md:grid-cols-2 sm:grid-cols-1 bg-white">
        <div className=" px-[100px] pt-10 sm:order-2">
          <h1 className="text-[#13304D] text-[30px] font-bold">
            NIKE TRIAL
            <br />
            THE BEST EVER
          </h1>
          <p className="text-[#707070] text-[12px] mt-3">
            Autem ipsum nam porro corporis rerum. Quis eos dolorem eos itaque
            inventore commodi labore quia quia. Exercitationem repudiandae
            officiis neque suscipit non officia eaque itaque enim. Voluptatem
            officia accusantium nesciunt est omnis tempora consectetur
            dignissimos.
          </p>
          <div className="flex justify-center mt-8">
            <button
              className="
                    bg-[#5B6EE8] font-bold
                    rounded-full text-white px-7 py-2"
            >
              Buy now
            </button>
          </div>
        </div>
        <div
          className=" 
            sm:order-1
            bg-[#5B6EE8] h-[380px] 
            flex justify-center
            sm:rounded-tl-[9px]  sm:rounded-bl-[0px]
            rounded-tl-[35px] rounded-bl-[35px]
            "
        >
          <img className="w-[500px]" src="/2.png" alt="" />
        </div>
      </div>

      <div className="px-10 contact mt-[100px]">
        <h1 className="text-center font-bold text-[20px] text-[#13304D]">
          Contact Us
        </h1>
        <div className="  grid md:grid-cols-3 sm:grid-cols-1  mt-5 ">
          <div className="flex justify-center sm:justify-start ">
            <MapPinIcon className=" w-[45px] px-2 py-0 mr-2 rounded-full text-white bg-[#5B6EE8]" />
            <p className="font-bold text-[#13304D]">
              Location:{" "}
              <span>
                <br /> A108 Adam Street New York, NY 535022
              </span>
            </p>
          </div>
          <div className="flex justify-center sm:justify-start sm:mt-3 ">
            <PhoneIcon className=" w-[45px] px-2 py-0 mr-2  rounded-full text-white bg-[#5B6EE8]" />
            <p className="font-bold text-[#13304D]">
              Location:{" "}
              <span>
                <br /> +123456789
              </span>
            </p>
          </div>
          <div className="flex justify-cente sm:justify-start sm:mt-3">
            <EnvelopeIcon className=" w-[45px] px-3 py-0 mr-2 rounded-full text-white bg-[#5B6EE8]" />
            <p className="font-bold text-[#13304D]">
              Email:{" "}
              <span>
                <br /> info@example.com
              </span>
            </p>
          </div>
        </div>
        {/* contact section */}
        <form
          onSubmit={new_message.handleSubmit}
          className="
          flex justify-center 
          mt-3 
          mx-[0px] md:py-[50px]
          sm:py-0 mt-5
          shadow-xl
          sm:w-full w-4/5
          rounded-tl-lg rounded-tr-lg
          rounded-bl-[35px] rounded-br-[35px] "
        >
          <div className="flex gap-4 justify-center flex-col sm:mt-3">
            <div className="grid grid-cols-2 gap-4">
              <div className="flex">
                <input
                  type="text"
                  className="
                  w-[250px] py-2 px-3
                  border-2 border-gray-400 
                  focus:outline-none rounded-sm
                focus:border-[#5B6EE8]"
                  placeholder="Your name"
                  name="name"
                  value={new_message.values.name}
                  onChange={new_message.handleChange}
                  onBlur={new_message.handleBlur}
                />
              </div>
              <div className="flex">
                <input
                  type="text"
                  className="
                w-[250px] py-2 px-3
                border-2 border-gray-400 
                focus:outline-none rounded-sm
                focus:border-[#5B6EE8]"
                  placeholder="Your email"
                  name="email"
                  value={new_message.values.email}
                  onChange={new_message.handleChange}
                  onBlur={new_message.handleBlur}
                />
              </div>
            </div>
            <div className="grid grid-cols-1">
              <input
                type="text"
                className="
                py-2 px-3
                border-2 border-gray-400 
                focus:outline-none rounded-sm
                focus:border-[#5B6EE8]"
                placeholder="Subject"
                name="subject"
                value={new_message.values.subject}
                onChange={new_message.handleChange}
                onBlur={new_message.handleBlur}
              />
            </div>
            <div className="grid grid-cols-1 ">
              <textarea
                className="
                text-start
                px-3 h-[150px]
                border-2 border-gray-400 
                focus:outline-none rounded-sm
              focus:border-[#5B6EE8]"
                placeholder="Message"
                name="message"
                value={new_message.values.message}
                onChange={new_message.handleChange}
                onBlur={new_message.handleBlur}
              />
              <div className="flex justify-center mt-5 mb-3">
                <button className=" bg-[#5B6EE8] rounded-full text-white px-7 py-2">
                  Send message
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>

      <Footer />
    </>
  );
}
