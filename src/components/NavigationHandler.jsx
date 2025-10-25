"use client";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { useLoading } from "@/context/LoadingContext";

export default function NavigationHandler() {
  const [trigger, setTrigger] = useState(false);
  const prevPathRef = useRef(null);

  const { almostDone, stopLoading, isLoading } = useLoading();
  const pathName = usePathname();

  useEffect(() => {
    if (isLoading && prevPathRef.current === pathName) {
      setTrigger(true);
      console.log("triggered!");
    }
  }, [isLoading])

  useEffect(() => {
    almostDone();
    
    if (prevPathRef.current !== null && prevPathRef.current !== pathName && !trigger) {
      stopLoading();
    } else if (trigger) {
      stopLoading();
      setTrigger(false);
    }
    
    prevPathRef.current = pathName;
  }, [pathName, trigger]);

  return null;
}