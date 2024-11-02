"use client";

import React from "react";
import { Carousel, CarouselResponsiveOption } from "primereact/carousel";
import { Button } from "primereact/button";
import { Tag } from "primereact/tag";
import useSWR from "swr";
import Link from "next/link";
import Image from "next/image";

// Define the Product type based on the structure of your product data
interface Product {
  _id: string;
  product_name: string;
  descri: string;
  img: string;
  categories: string[];
  price: number;
}

// Define the fetcher function for useSWR
const fetcher = (url: string) => fetch(url).then((res) => res.json());

const Product_carousel: React.FC = () => {
  // Use SWR to fetch the data
  const { data: products, error } = useSWR(
    "http://localhost:1234/api/product?new=true",
    fetcher
  );

  // Define responsive options for the carousel
  const responsiveOptions: CarouselResponsiveOption[] = [
    { breakpoint: "1400px", numVisible: 3, numScroll: 1 },
    { breakpoint: "1024px", numVisible: 2, numScroll: 1 },
    { breakpoint: "768px", numVisible: 1, numScroll: 1 },
  ];

  // Template for rendering each product in the carousel
  const productTemplate = (product: Product) => {
    return (
      <div
        className="   
          w-[250px] bg-white
          overflow-hidden shadow-lg 
          rounded-tr-[7px] rounded-tl-[7px] 
          rounded-br-[15px] rounded-bl-[15px]
          animate__animated animate__pulse 
          lg:ml-[120px] md:mx-[10px] 
          mt-5"
        key={product._id}
      >
        <div className="flex w-[250px] h-[250px] justify-center p-3">
          <Image
            src={`/db_images/${product.img}`}
            width={1200}
            height={100}
            alt="product image"
          />
        </div>

        <div className="px-3 py-4">
          <div className=" flex justify-between font-bold text-md text-[#13304D] mb-2 px-3">
            <p>{product.product_name} </p>
            <p>{product.price}</p>
          </div>
        </div>
        <div className="flex justify-center mb-5">
          <Link href={`/detail?id=${product._id}`}>
            <button
              className="
            border border-[#13304D] 
            text-[#13304D] rounded-full
            px-5 py-2 hover:bg-[#13304D] 
            hover:text-white"
            >
              More details
            </button>
          </Link>
          {/* <button onClick={add_to_cart}>
              <ShoppingCartIcon className=" w-[35px] p-2 ml-5 rounded-lg text-white bg-[#5B6EE8]"/>
            </button> */}
        </div>
      </div>
    );
  };

  // Display loading and error messages
  if (error) return <div>Error loading products.</div>;
  if (!products) return <div>Loading...</div>;

  return (
    <div className="card">
      <Carousel
        value={products}
        numVisible={3}
        numScroll={1}
        responsiveOptions={responsiveOptions}
        itemTemplate={productTemplate}
      />
    </div>
  );
};

export default Product_carousel;
