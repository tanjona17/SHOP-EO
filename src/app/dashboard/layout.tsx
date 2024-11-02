"use client";

import { ReactNode } from "react";
import Navbar from "../components/Navbar"; 
import "../globals.css";
import Side_bar from "../components/Side_bar";
import { Provider } from "react-redux";
import { admin_store, persistor } from "@/redux/admin_store";
import { PersistGate } from "redux-persist/integration/react";
import Tailwind from "primereact/passthrough/tailwind";
import { PrimeReactProvider } from "primereact/api";
type Props = {
  children: ReactNode;
};

const Layout = ({ children }: Props) => {
  return (
    <>
      <Provider store={admin_store}>
        <PersistGate loading="null" persistor={persistor}>
          <PrimeReactProvider value={{unstyled: false, }}>      
          <Navbar title={"ShopEoAdmin"} />
          <Side_bar />
          {children}
          </PrimeReactProvider>
        </PersistGate>
      </Provider>
    </>
  );
};

export default Layout;
