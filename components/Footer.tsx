import Link from "next/link";
import React from "react";
import {BsMedium, BsTelegram, BsTwitter} from "react-icons/bs";

export default function Footer() {
  return (
    <footer className="bg-slate-900">
      <div className="container mx-auto py-8 px-4">
        <div className="flex flex-col lg:flex-row justify-between space-y-4 lg:space-y-0">
          <div className="flex flex-col space-y-2">
            <Link href="/" className="text-[#999] hover:text-white">
              Home
            </Link>
            <Link href="/son-eklenen" className="text-[#999] hover:text-white">
              Son Eklenen
            </Link>
            <Link href="/film" className="text-[#999] hover:text-white">
              Filmler
            </Link>
          </div>
          <div className="flex flex-col space-y-2">
            <h3 className="text-[#999] font-semibold text-sm">Social</h3>
            <div className="flex space-x-3">
              <Link
                href="/"
                className="text-blue-600 hover:text-blue-500"
                title="ice777x"
                rel="noreferrer noopener"
              >
                <BsTwitter className="text-lg" />
              </Link>
              <a
                href="https://t.me/ice777x"
                className="text-blue-600 hover:text-blue-500 "
                title="ice777x"
                rel="noreferrer noopener"
              >
                <BsTelegram className="text-lg" />
              </a>
              <a
                href="https://t.me/ice777x"
                className="text-gray-400 hover:text-white"
                title="ice777x"
                rel="noreferrer noopener"
              >
                <BsMedium className="text-lg" />
              </a>
            </div>
          </div>
          <div className="flex flex-col space-y-2">
            <Link href="/" className="text-[#999] hover:text-white">
              About
            </Link>
            <Link href="/son-eklenen" className="text-[#999] hover:text-white">
              Contact
            </Link>
            <Link href="/" className="text-[#999] hover:text-white">
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
