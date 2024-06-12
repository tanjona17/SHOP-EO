import React from 'react'
import Image from 'next/image'

export default function Footer() {
  return (
    <>
        <div className='  bg-[#5B6EE8] mt-10'>
            <div className='flex justify-center'>
                <div className='px-5 py-4'>
                    <Image src='/facebook.png' width={30} height={30} alt='facebook logo'/>
                </div>
                <div className='px-5 py-4'>
                    <Image src='/linkedin.png' width={30} height={30} alt='linkedin logo'/>
                </div>
                <div className='px-5 py-4'>
                    <Image src='/skype.png' width={30} height={30} alt='skype logo'/>
                </div>
            </div>
            <div className='justify-center flex'>
             <p className='text-white'>@ Copyright Tanjona. All Rights Reserved</p>   
            </div>
           
        </div>    
       
    </>
  )
}
