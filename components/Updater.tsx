"use client";
import React, {useEffect} from "react";

export default function Updater() {
  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("/api/films/update");
      const data = await res.json();
    };
    const interval = setInterval(() => {
      fetchData();
    }, 86400);
    return () => clearInterval(interval);
  }, []);

  return null;
}
