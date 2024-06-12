"use client";
import { Metadata } from "next";
import { ReactNode } from "react";
import Navbar from "../components/Navbar";
import Script from "next/script";

import "preline/dist/preline.js";
import Side_bar from "../components/Side_bar";
import Head from "next/head";
type Props = {
  children: ReactNode;
};

const Layout = ({ children }: Props) => {
  return (
    <>
      <Navbar title={"ShopEoAdmin"} />
      <Side_bar />
      {children}
    </>
  );
};

export default Layout;
