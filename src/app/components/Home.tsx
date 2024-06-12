'use client'
import Image from 'next/image'
import React from 'react'
import Footer from './Footer'
import '../globals.css'
import {
    MapPinIcon,
    PhoneIcon,
    EnvelopeIcon} 
from '@heroicons/react/24/solid'
import Products_catalogs from './Products_catalogs'
import Link from 'next/link'
import { useSelector } from 'react-redux'

export default function  Home() {
    const user = useSelector(state =>state.user);
    console.log(user);
    
  return (
    <>
        <header className=''>
            <div className='flex grid grid-cols-2 bg-white' >
                <div className=''>
                    <p className='
                    font-bold text-[#13304D]
                    text-[16px] mt-2 ml-3
                    '>
                        Shop-Eo
                    </p>
                    <div className='pl-[150px] pt-[90px] bg-white'>
                        <h1 className='text-[#13304D] font-bold text-[35px]'>
                            Find,Buy your<br/>dream<br/> product here
                        </h1>
                        <div className='mt-5 '>
                            <Link href={"/shop"}>
                                <button className='
                                    bg-[#5B6EE8] font-bold
                                    rounded-full text-white 
                                    px-7 py-2' >
                                        Shop now
                                </button>
                            </Link>
                            
                        </div>      
                    </div>
                </div>
               
                <div className='
                  bg-[#5B6EE8] h-[400px] 
                    rounded-tl-full
                    rounded-bl-full'>
                        <div className=' flex justify-end'>
                            <Link href={'/login'}>
                                <button className='
                                mr-5 px-5 py-1 mt-2
                                bg-white  
                                rounded-[5px] text-[#13304D]'>
                                    Log in
                                </button>
                            </Link>
                        </div>
                       
                        <div className='  
                        flex justify-center 
                        px-[100px] py-[60px]'>
                            <img className='w-100' src="hero-img.png" alt="" />
                        </div>
                </div>
            </div>
        </header>
        <p className='
        mt-10 ml-10
        text-[#13304D] font-semibold
        '>
            Explore our products
        </p>
        <Products_catalogs/>
        <p className='
        mt-10 ml-10
        text-[#13304D] font-semibold
        '>
           Our top product
        </p>
        <div className='flex grid grid-cols-2 bg-white'>
            <div className=' px-[100px] pt-10'>
                <h1 className='text-[#13304D] text-[30px] font-bold'>NIKE TRIAL<br/>THE BEST EVER</h1>
                <p className='text-[#707070] text-[12px] mt-3'>
                    Autem ipsum nam porro corporis rerum. 
                    Quis eos dolorem eos itaque inventore commodi labore quia quia.
                    Exercitationem repudiandae officiis neque suscipit non officia eaque itaque enim.
                    Voluptatem officia accusantium nesciunt est omnis tempora consectetur dignissimos.
                </p>
                <div className='flex justify-center mt-8'>
                    <button className='
                    bg-[#5B6EE8] font-bold
                    rounded-full text-white px-7 py-2' >
                        Buy now
                    </button>
                </div>
            </div>  
            <div className=' 
            bg-[#5B6EE8] h-[380px] 
            flex justify-center
            rounded-tl-[35px] rounded-bl-[35px]
            '>
                <img className='w-[500px]' src="/2.png" alt="" />
            </div>
        </div>

      <div className='px-10 contact mt-[100px]' >
            <h1 className='text-center font-bold text-[20px] text-[#13304D]'>Contact Us</h1>
            <div className='flex  grid grid-cols-3 mt-5'>
                <div className='flex justify-center '>
                    <MapPinIcon className=" w-[45px] px-2 py-0 rounded-full text-white bg-[#5B6EE8]" />
                    <p className='font-bold text-[#13304D]' >Location: <span><br/>  A108 Adam Street
                    New York, NY 535022</span></p>   
                </div>
                <div className='flex justify-center'>
                  <PhoneIcon className=" w-[45px] px-2 py-0   rounded-full text-white bg-[#5B6EE8]"/>
                  <p className='font-bold text-[#13304D]' >Location: <span><br/> +123456789</span></p> 
                </div>
                <div className='flex justify-center'>
                    <EnvelopeIcon className=" w-[45px] px-3 py-0 rounded-full text-white bg-[#5B6EE8]"/>
                    <p className='font-bold text-[#13304D]' >Email: <span><br/> info@example.com</span></p>  
                </div>
            </div>
            <form className='
                flex justify-center 
                mt-3 bg-teal-200 
                mx-[150px] py-[50px]
                bg-white shadow-xl
                rounded-tl-lg rounded-tr-lg
                rounded-bl-[35px] rounded-br-[35px] ' 
            >
                <div className="flex gap-4 justify-center flex-col">
                    <div className='grid grid-cols-2 gap-4'>
                        <div className='flex'>
                            <input type="text"
                                className='
                                w-[250px] py-2 px-3
                                border-2 border-gray-400 
                                focus:outline-none rounded-sm
                                focus:border-[#5B6EE8]'
                                placeholder='Your name'
                            />

                        </div>
                        <div className='flex'>
                            <input type="text"
                                className='
                                w-[250px] py-2 px-3
                                border-2 border-gray-400 
                                focus:outline-none rounded-sm
                                focus:border-[#5B6EE8]'
                                placeholder='Your name'
                            />
                        </div>
                    </div>
                    <div className='grid grid-cols-1'>
                    <input type="text"
                                className='
                                py-2 px-3
                                border-2 border-gray-400 
                                focus:outline-none rounded-sm
                                focus:border-[#5B6EE8]'
                                placeholder='Subject'
                            />
                    </div>
                    <div className='grid grid-cols-1 '>
                        <textarea 
                                    className='
                                    text-start
                                    px-3 h-[150px]
                                    border-2 border-gray-400 
                                    focus:outline-none rounded-sm
                                    focus:border-[#5B6EE8]'
                                    placeholder='Message'
                                />
                        <div className='flex justify-center mt-5'>
                            <button className=' bg-[#5B6EE8] rounded-full text-white px-7 py-2' >
                                Send message
                            </button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    


        



        <Footer /> 

    </>
  )
}
