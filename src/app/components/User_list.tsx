"use client";
import React, { useState } from "react";
import "preline/dist/preline.js";
import { DataTable } from "primereact/datatable";
import { Tooltip } from "primereact/tooltip";
import { Column } from "primereact/column";
import "primereact/resources/themes/lara-light-cyan/theme.css";
import { FilterMatchMode } from "primereact/api";
import useSWR, { mutate } from "swr";
import { EyeIcon, PencilIcon, TrashIcon } from "@heroicons/react/24/solid";
import axios from "axios";
import { TOKEN } from "@/redux/api";
import { User } from "../types/users_type";
import Image from "next/image";

const fetcher = (...args: [any]) =>
  fetch(...args, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      token: `Bearer ${TOKEN}`, // get user token
    },
  }).then((res) => res.json());

export default function User_list() {
  // fetching data
  const { data, error } = useSWR("http://localhost:1234/api/user/", fetcher);
  console.log(data);
  
  // filters
  const [selected_user, set_user] = useState<User[]>([]);
  const [row_click, set_clicked] = useState<boolean>(true);
  const [globalFilterValue, setGlobalFilterValue] = useState<string>("");
  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    // username: { value: null, matchMode: FilterMatchMode.CONTAINS },

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
  const get_ids = selected_user.map((x) => [x._id]);
  const ids = get_ids.flat();

  const handle_delete = async (ids: any) => {
    try {
      const ids_array = Array.isArray(ids) ? ids : [ids];
      const response = await axios.delete(
        `http://localhost:1234/api/user/`,
        {
          data: { ids: ids_array },
        }
      );

      set_user([]);

      mutate(`http://localhost:1234/api/user/`);
    } catch (error) {
      console.error("Error during deletion:", error);
    }
  };
  const user_image = (row_data: User) =>{
    return (
         <Image className="rounded-full" src={`/db_images/${row_data.img}`}  key={row_data._id} width={40} height={10} alt="user_image"/>

    )
  };
  const user_type = (row_data: User) =>{
      if (row_data.is_admin) {
        return <p>Admin</p>
      }else{
        return <p>Customer</p>
      }
  }
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
        {selected_user &&
        selected_user.length > 0 &&
        selected_user.length === 1 ? (
          <>
            {selected_user.map((x) => {
              return (
                <>
                  <div className="flex justify-center" key={x._id}>
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
              );
            })}
          </>
        ) : selected_user.length > 1 ? (
          <div className="flex justify-center">
            <button
              className="bg-red-400 px-6 py-[6px] rounded-lg delete"
              onClick={() => handle_delete(ids)}
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
      <div className="px-[60px] pt-3  mt-20  lg:ml-[280px] sm:ml-0 h-screen">
        <div className="grid grid-cols-1">
          <h1>List of users</h1>
        </div>
        <div className="grid grid-cols-1 gap-14 mb-4  ">
          <DataTable 
            className="w-full"
            header={header}
            value={data}
            selectionMode={row_click ? undefined : "multiple"}
            selection={selected_user!}
            // tableStyle={{width:"850px"}}
            sortMode="multiple"
            onSelectionChange={(e: { value: React.SetStateAction<User[]>}) => set_user(e.value)}
            stripedRows
            globalFilterFields={["username","is_admin"]}
            filters={filters}
            filterDisplay="menu"
            
          >
            <Column
              selectionMode="multiple"
              headerStyle={{ width: "3rem", border: "5px black" }}
            ></Column>
            {/* <Column  field="_id" header="ID" sortable></Column> */}
            <Column   header="User photo"   body={user_image} ></Column>
            <Column  field="username" header="Username"></Column>
            <Column  field="email" header="Email"></Column>
            <Column field="is_admin"  header="Status" body={user_type} ></Column>
          </DataTable>
        </div>
      </div>
    </>
  );
}
