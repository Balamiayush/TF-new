"use client";

import { useEffect } from "react";
import { useLenisContext } from "@/store/lenis-context";


export function useScrollLock(isLocked: boolean = true): void {
  const lenis = useLenisContext();

  useEffect(() => {
    if (!isLocked) return;

    if (lenis) lenis.stop();
    const originalStyle = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      if (lenis) lenis.start();
      document.body.style.overflow = originalStyle;
    };
  }, [lenis, isLocked]);
}

export default useScrollLock;