"use client";

import { useEffect, useState } from "react";

export function useMobile() {
  const [isMobile, setIsMobile] = useState(false);
  const [isLessThan768, setIsLessThan768] = useState(false);
  const [isLessThan482, setIsLessThan482] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsLessThan768(window.innerWidth < 768);
      if (window.innerWidth < 482) {
        setIsMobile(true);
        setIsLessThan482(true);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return { isMobile, isLessThan768, isLessThan482 };
}
