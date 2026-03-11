"use client";

import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";

import Lenis from "lenis";

import { usePathname } from "next/navigation";

const LenisContext = createContext<Lenis | null>(null);

export default function LenisContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const lenisRef = useRef<Lenis | null>(null);

  const [lenis, setLenis] = useState<Lenis | null>(null);

  const pathname = usePathname();

  useEffect(() => {
    const isMobile = window.matchMedia("(max-width: 768px)").matches;

    if (isMobile) return;

    const instance = new Lenis({
      smoothWheel: true,
      lerp: 0.1,
      prevent: (node) =>
        Boolean(
          node?.closest?.(
            "[data-lenis-prevent], .mantine-Drawer-root, .mantine-Modal-root",
          ),
        ),
    });

    lenisRef.current = instance;

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setLenis(instance);

    let rafId: number;

    const raf = (time: number) => {
      instance.raf(time);
      rafId = requestAnimationFrame(raf);
    };

    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      instance.destroy();
      lenisRef.current = null;
      setLenis(null);
    };
  }, []);

  useEffect(() => {
    if (!lenis) return;

    lenis.scrollTo(0, {
      immediate: true,
      force: true,
    });
  }, [pathname, lenis]);

  return (
    <LenisContext.Provider value={lenis}>{children}</LenisContext.Provider>
  );
}

export function useLenisContext() {
  return useContext(LenisContext);
}
