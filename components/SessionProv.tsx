"use client";
import {useRouter} from "next/navigation";
import React, {useEffect, useState} from "react";
import {FaSpinner} from "react-icons/fa";

export default function SessionProv() {
  const router = useRouter();
  const [session, setSession] = useState<string | null>();
  const [name, setName] = useState<string | null>();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const sess = localStorage.getItem("session");
    if (sess) {
      setSession(sess);
    }
    setLoading(false);
  }, [session]);
  const handleClick = async () => {
    const resp = await fetch("/api/user/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({name}),
    });
    if (resp.status !== 200) {
      return;
    }
    const data = await resp.json();
    localStorage.setItem("session", data.user.session);
    setSession(data.user.session);
    location.reload();
  };
  if (loading) {
    return (
      <div className="fixed top-1/2 left-1/2 bg-black opacity-90 z-[800] w-full h-full flex justify-center items-center -translate-x-1/2 -translate-y-1/2 transform">
        <FaSpinner className="text-3xl animate-spin text-indigo-800 accent-teal-600" />
      </div>
    );
  }
  if (!session) {
    return (
      <div>
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-70 z-[798]" />
        <div className="fixed top-0 left-0 w-full h-full z-[799] flex items-center justify-center">
          <div className="bg-gray-900 rounded-lg p-8">
            <div className="text-2xl text-center font-bold">Login</div>
            <div className="mt-4">
              <label className="block">
                <span className="text-gray-400">Name</span>
                <input
                  type="name"
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                  className="form-input mt-1 block w-full bg-gray-800 p-2 rounded-lg text-white focus:outline-none border border-gray-700 hover:border-gray-500"
                  placeholder="Your name"
                />
              </label>
            </div>
            <div className="mt-4">
              <button
                onClick={handleClick}
                className="rounded-lg bg-indigo-600 px-4 py-2 w-full"
              >
                Login
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
  return null;
}
