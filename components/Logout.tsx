"use client";
import {useRouter} from "next/navigation";
import React from "react";
import useSession from "../lib/useSession";

export default function Logout() {
  const router = useRouter();
  const {session, loading} = useSession();
  const handleLogout = async () => {
    if (!session) return;
    try {
      const session = localStorage.removeItem("session");
    } catch (error) {
      return;
    }
    location.reload();
  };
  return (
    <>
      {session ? (
        <button
          onClick={handleLogout}
          className="border border-blue-600 rounded-lg px-4 py-2.5 text-sm hover:text-white hover:bg-blue-600"
        >
          Logout
        </button>
      ) : null}
    </>
  );
}
