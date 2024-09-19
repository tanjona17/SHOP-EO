"use client";
import { Inter } from "next/font/google";
import "./globals.css";
import "primereact/resources/themes/lara-light-blue/theme.css"
import { Provider } from "react-redux";
import { store, persistor } from "@/redux/store";
import "../../public/assets/animate.css/animate.min.css"
import { PersistGate } from "redux-persist/integration/react";



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            {children}
          </PersistGate>
        </Provider>
      </body>
    </html>
  );
}
