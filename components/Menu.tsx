"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import {BsList, BsX, BsXLg} from "react-icons/bs";
import {MdClose} from "react-icons/md";

export default function Menu() {
  const [isOpen, setIsOpen] = React.useState(false);
  return (
    <div>
      {isOpen ? (
        <MdClose
          className="text-2xl"
          onClick={() => {
            setIsOpen(!isOpen);
          }}
        />
      ) : (
        <BsList className="text-2xl" onClick={() => setIsOpen(!isOpen)} />
      )}
      {isOpen && (
        <div className="fixed inset-0 w-full h-full bg-slate-900 z-[50]">
          <div className="flex justify-end">
            <BsX
              size={27}
              onClick={() => {
                setIsOpen(!isOpen);
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
