"use client";
import { useEffect, useState } from "react";
import { useLoading } from "@/context/LoadingContext";

export default function NavigationHandler() {
  const [trigger, setTrigger] = useState(false);

  const { almostDone, stopLoading, isLoading, pathName, prevPathRef } = useLoading();

  useEffect(() => {
    if (isLoading && prevPathRef.current === pathName) {
      setTrigger(true);
    }
  }, [isLoading])

  useEffect(() => {
    let timeout;
    
    if (prevPathRef.current !== null && prevPathRef.current !== pathName) {
      almostDone();

      timeout = setTimeout(() => {
        stopLoading();
      }, 200);

      setTrigger(false);
    }
    
    prevPathRef.current = pathName;

    return () => clearTimeout(timeout);
  }, [pathName, trigger]);

  return null;
}