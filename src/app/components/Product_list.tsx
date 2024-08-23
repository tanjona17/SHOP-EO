"use client";
import React, { useEffect, useState } from "react";
import "preline/dist/preline.js";
import { DataTable } from "primereact/datatable";
import { Tooltip } from "primereact/tooltip";
import { Column } from "primereact/column";
import "primereact/resources/themes/lara-light-cyan/theme.css";
import { FilterMatchMode } from "primereact/api";

import useSWR, { mutate } from "swr";

import { EyeIcon, PencilIcon, TrashIcon } from "@heroicons/react/24/solid";
import axios from "axios";
import Link from "next/link";
import { Product_type } from "../types/products_type";

export default function Product_list() {
  // fetching data
  const fetcher = (...args: [any]) => fetch(...args).then((res) => res.json());
  const { data, error } = useSWR(
    `http://localhost:1234/api/product/`,
    fetcher,
    { refreshInterval: 1 }
  );
  // filters
  const [selected_data, set_data] = useState([]);
  const [selected_product, set_product] = useState<Product_type[]>([]);
  const [row_click, set_clicked] = useState<boolean>(true);
  const [globalFilterValue, setGlobalFilterValue] = useState("");

  const get_ids = selected_product.map((x) => [x._id])
  const ids = get_ids.flat()
console.log(ids);

  
  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    product_name: { value: null, matchMode: FilterMatchMode.CONTAINS },
    // 'initial_values.name': { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    // representative: { value: null, matchMode: FilterMatchMode.IN },
    // status: { value: null, matchMode: FilterMatchMode.EQUALS },
    // verified: { value: null, matchMode: FilterMatchMode.EQUALS }
  });
  const onGlobalFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    let _filters = { ...filters };

    // @ts-ignore
    _filters["global"].value = value;

    setFilters(_filters);
    setGlobalFilterValue(value);
  };


  const handle_delete = async (ids: any) => {
    try {
      
      const ids_array = Array.isArray(ids) ? ids : [ids];
      const response = await axios.delete(`http://localhost:1234/api/product/`, {
        data: { ids: ids_array }
      });
  
      console.log(response.data);
  
      mutate(`http://localhost:1234/api/product/`);
    } catch (error) {
      console.error("Error during deletion:", error);
    }
  };

  
  const renderHeader = () => {
    return (
      <div className="grid grid-cols-2">
        <input
          className=" border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
          type="text"
          placeholder="Keyword Search"
          value={globalFilterValue}
          onChange={onGlobalFilterChange}
        />
        {selected_product && 
        selected_product.length > 0 &&
        selected_product.length === 1 ? (
          <>
          {selected_product.map((x)=>{
            return <>
            <div className="flex justify-center">
            <button
              className="px-6 view py-[6px] rounded-lg flex"
              data-pr-tooltip="View"
              data-pr-position="right"
              data-pr-at="right+5 top"
              data-pr-my="left center-2"
            >
              <Tooltip
                target=".view"
                className="ml-[-40px] mt-[-10px] opacity-80"
              />
              <EyeIcon className="  w-7 h-7" />
            </button>
            <Link href={`product/edit?id=${x._id}`}>
              <button
                className="bg-purple-500 px-6 py-[6px] mx-3 rounded-lg edit"
                data-pr-tooltip="Edit"
                data-pr-position="right"
                data-pr-at="right+5 top"
                data-pr-my="left center-2"
              >
                <Tooltip
                  target=".edit"
                  className="ml-[-20px] mt-[-10px] opacity-80"
                />
                <PencilIcon className="  w-7 h-7" />
              </button>
            </Link>
            <button
              className="bg-red-400 px-6 py-[6px] rounded-lg delete"
              onClick={() => handle_delete(x._id)}
              data-pr-tooltip="Delete"
              data-pr-position="right"
              data-pr-at="right+5 top"
              data-pr-my="left center-2"
            >
              <Tooltip
                target=".delete"
                className="ml-[-15px] mt-[-10px] opacity-80"
              />
              <TrashIcon className=" w-7 h-7" />
            </button>
          </div>
          </>
          })}
          </>
          
        ) : selected_product.length > 1 ? (
          
          <div className="flex justify-center">
            <button
              className="bg-red-400 px-6 py-[6px] rounded-lg delete"
              onClick={() => handle_delete((ids))}
              data-pr-tooltip="Delete"
              data-pr-position="right"
              data-pr-at="right+5 top"
              data-pr-my="left center-2"
            >
              <Tooltip
                target=".delete"
                className="ml-[-15px] mt-[-10px] opacity-80"
              />
              <TrashIcon className=" w-7 h-7" />
            </button>
          </div>
        ) : (
          ""
        )}
      </div>
    );
  };
  const header = renderHeader();

  return (
    <>
      <div className="px-[60px] pt-3    lg:ml-[280px] sm:ml-0 h-screen">
        <div className="grid grid-cols-2">
          <h1>List of users</h1>
          <Link href={"product/add"}>
            <button>Add new product</button>
          </Link>
        </div>
        <div className="grid grid-cols-1 gap-14 mb-4  ">
          <DataTable
            className="w-full"
            header={header}
            value={data}
            selectionMode={row_click ? undefined : "multiple"}
            selection={selected_product!}
            sortMode="multiple"
            onSelectionChange={(e: { value: React.SetStateAction<never[]> }) =>
              set_product(e.value)
            }
            stripedRows
            globalFilterFields={["product_name", "price"]}
            filters={filters}
            filterDisplay="menu"
          >
            <Column
              selectionMode="multiple"
              headerStyle={{ width: "3rem", border: "5px black" }}
            ></Column>
            <Column field="_id" header="ID" sortable></Column>
            <Column field="product_name" header="Name"></Column>
            <Column field="price" header="Price"></Column>
          </DataTable>
        </div>
      </div>
    </>
  );
}



