import React from "react";
import Header from "../components/Header";
import {Poppins} from "next/font/google";
import "../styles/globals.css";
import Footer from "../components/Footer";
import SessionProv from "../components/SessionProv";
import Updater from "../components/Updater";

export const dynamic = "auto";
const font = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin", "latin-ext"],
});

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html className={`${font.className} [color-scheme:dark] scroll-smooth`}>
      <head />
      <body className="bg-[#181D31] text-white">
        <Header />
        <SessionProv />
        <main>{children}</main>
        <Updater />
        <Footer />
      </body>
    </html>
  );
}
