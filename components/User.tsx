"use client";
import React from "react";
import useSession from "../lib/useSession";

export default function User() {
  const {session, loading} = useSession();
  if (loading) {
    return null;
  }
  if (!session) {
    return null;
  }
  return (
    <div className="hover:text-white pointer-events-none">{session.name}</div>
  );
}
