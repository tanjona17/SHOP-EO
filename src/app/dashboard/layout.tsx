"use client";
import { Metadata } from "next";
import { ReactNode } from "react";
import Navbar from "../components/Navbar";
import "preline/dist/preline.js";
import Side_bar from "../components/Side_bar";
import { Provider } from "react-redux";
import { admin_store, persistor } from "@/redux/admin_store";
import { PersistGate } from "redux-persist/integration/react";

type Props = {
  children: ReactNode;
};

const Layout = ({ children }: Props) => {
  return (
    <>
      <Provider store={admin_store}>
        <PersistGate loading="null" persistor={persistor}>
          <Navbar title={"ShopEoAdmin"} />
          <Side_bar />
          {children}
        </PersistGate>
      </Provider>
    </>
  );
};

export default Layout;
