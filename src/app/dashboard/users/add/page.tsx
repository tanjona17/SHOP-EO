"use client";

import React from "react";
import "preline/dist/preline.js";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";

import { ToggleButton } from "primereact/togglebutton";

export default function Page() {

  const new_staff = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
      is_admin: false,
    },
    validationSchema: Yup.object({
      username: Yup.string().required("Required"),
      email: Yup.string().required("Required"),
      password: Yup.string().required("Required"),
      is_admin: Yup.boolean(),
    }),
    onSubmit: async (values, actions) => {
      const form_data = new FormData();
      form_data.append("username", values.username);
      form_data.append("email", values.email);
      form_data.append("password", values.password);
      form_data.append("is_admin", values.is_admin.toString()); // Convert boolean to string

      // If you want to handle image upload in the future, uncomment this:
      // if (values.img) {
      //   formData.append("img", values.img);
      // }

      try {
        await axios.post("http://localhost:1234/api/auth/register", values);
        actions.resetForm();
      } catch (error) {
        console.error("Error during insertion:", error);
      }
    },
  });

  return (
    <div className="px-[60px] pt-3 lg:ml-[280px] sm:ml-0 h-screen w-full">
      <h1>Add new staff</h1>
      <form
        onSubmit={new_staff.handleSubmit}
        className="flex justify-center flex-col w-[80%] bg-white px-10 pt-10 shadow-lg rounded-[9px] mt-3"
      >
        <div className="grid grid-cols-3 gap-3 mx-3 mb-6">
          <div className="mb-6 md:mb-0">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              Username
            </label>
            <input
              className={
                new_staff.errors.username && new_staff.touched.username
                  ? "bg-gray-50 border border-red-500 text-gray-900 text-sm rounded-lg focus:ring-red-600 focus:border-red-600 block w-full p-2.5"
                  : "appearance-none block w-full text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              }
              name="username"
              value={new_staff.values.username}
              placeholder="Username"
              onChange={new_staff.handleChange}
              onBlur={new_staff.handleBlur}
              type="text"
            />
            {new_staff.errors.username && new_staff.touched.username ? (
              <p className="text-red-500 text-sm">
                {new_staff.errors.username}
              </p>
            ) : (
              ""
            )}
          </div>
          <div>
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              Email
            </label>
            <input
              className={
                new_staff.errors.email && new_staff.touched.email
                  ? "bg-gray-50 border border-red-500 text-gray-900 text-sm rounded-lg focus:ring-red-600 focus:border-red-600 block w-full p-2.5"
                  : "appearance-none block w-full text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              }
              name="email"
              value={new_staff.values.email}
              placeholder="Email"
              onChange={new_staff.handleChange}
              onBlur={new_staff.handleBlur}
              type="text"
            />
            {new_staff.errors.email && new_staff.touched.email ? (
              <p className="text-red-500 text-sm">{new_staff.errors.email}</p>
            ) : (
              ""
            )}
          </div>
          <div>
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              Password
            </label>
            <input
              className={
                new_staff.errors.password && new_staff.touched.password
                  ? "bg-gray-50 border border-red-500 text-gray-900 text-sm rounded-lg focus:ring-red-600 focus:border-red-600 block w-full p-2.5"
                  : "appearance-none block w-full text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              }
              name="password"
              type="password"
              value={new_staff.values.password}
              placeholder="Password"
              onChange={new_staff.handleChange}
              onBlur={new_staff.handleBlur}
            />
            {new_staff.errors.password && new_staff.touched.password ? (
              <p className="text-red-500 text-sm">
                {new_staff.errors.password}
              </p>
            ) : (
              ""
            )}
          </div>
        </div>
        <div className="grid grid-cols-2 gap-7">
          <div>
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              Admin
            </label>
            <ToggleButton
              name="is_admin"
              checked={new_staff.values.is_admin}
              onChange={(e) => new_staff.setFieldValue("is_admin", e.value)}
            />
            {new_staff.errors.is_admin && new_staff.touched.is_admin ? (
              <p className="text-red-500 text-sm">{new_staff.errors.is_admin}</p>
            ) : (
              ""
            )}
          </div>
        </div>
        <div className="flex justify-center mt-6 mb-10">
          <button
            type="submit"
            className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg"
          >
            Add
          </button>
          <button className="ml-5 opacity-75 hover:bg-red-500 text-red-400 font-semibold hover:text-white py-2 px-4 border border-red-400 hover:border-transparent rounded-lg">
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
