"use client";

import { type ReactNode } from "react";

import LenisContextProvider from "./lenis-context";

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <>
      <LenisContextProvider>{children}</LenisContextProvider>
    </>
  );
}
