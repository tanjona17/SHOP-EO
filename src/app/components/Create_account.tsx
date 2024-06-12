'use client'
import Link from 'next/link'
import React from 'react'

export default function Create_account() {
  return (
    <div className='flex justify-center w-screen h-screen items-center'>
    <div className='
    grid grid-cols-2
    w-[750px] h-[450px] 
    rounded-[10px]
    bg-[#5B6EE8]'
    >
        <div className='flex justify-center items-center w-full h-full'>
            <div className='text-white font-bold'>
                <p className='text-[30px]'>JOIN US <span className='text-[20px]'>and<br />FIND YOUR PRODUCTS</span> </p>
            </div>
           
        </div>
        <div className='
        bg-white w-full h-full 
        rounded-tr-[9px] rounded-tl-[35px] 
        rounded-bl-[35px] rounded-br-[9px]  ' >
            <div className='flex flex-col  justify-center items-center w-full h-[420px] ' >
                <div className='
                flex justify-center mb-7
                text-[24px] font-bold text-[#13304D]'
                >
                    <h1>Create account</h1>
                </div>    
                <div className='flex'>
                    <input type="text"
                                    className='
                                    w-[270px] py-2 px-3 text-[12px]
                                    shadow-lg border-[#e6e6e6]
                                    focus:outline-none rounded-full 
                                    '
                                    name='username'
                                    placeholder='Username'
                                />
                </div>
                <div className='flex mt-5'>
                    <input type="text"
                                    className='
                                    w-[270px] py-2 px-3 text-[12px]
                                    shadow-lg border-[#e6e6e6]
                                    focus:outline-none rounded-full 
                                    '
                                    name='email'
                                    placeholder='Email'
                                />
                </div>
                <div className='flex mt-5'>
                    <input type="password"
                                    className='
                                     w-[270px] py-2 px-3 text-[12px]
                                     shadow-lg border-[#e6e6e6]
                                     focus:outline-none rounded-full'
                                     name='password'
                                    placeholder='Password'
                                />
                </div>
                <div className='flex justify-center'>
                    <button className='
                        bg-[#5B6EE8] font-normal
                        rounded-full text-white 
                        px-5 py-2 mt-5' >
                        Create
                    </button>
                </div>
            </div>
           <p className='text-[12px] ml-10'>Already have an account ? <span><Link href="/login" className='text-[#5B6EE8]'>Log in</Link></span></p>
        </div>
    </div>
   </div>
  )
}
