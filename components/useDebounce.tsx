"use client";
import React, {useState, useEffect} from "react";

export default function useDebounce(value: string, delay: number) {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const tId = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    return () => {
      clearTimeout(tId);
    };
  }, [value, delay]);
  return debouncedValue;
}
