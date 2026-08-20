"use client";

import React, { useRef } from "react";
import { TransitionRouter } from "next-transition-router";
import PixelTransition, { PixelTransitionRef } from "@/shared/ui/PixelTransition";

export default function Template({ children }: { children: React.ReactNode }) {
  const pixelRef = useRef<PixelTransitionRef | null>(null);

  return (
    <TransitionRouter
      auto
      leave={(next) => {
        
        if (pixelRef.current) {
          pixelRef.current.cover().then(next);
        } else {
          next();
        }
      }}
      enter={(next) => {
        
        if (pixelRef.current) {
          pixelRef.current.reveal().then(next);
        } else {
          next();
        }
      }}
    >
      <PixelTransition ref={pixelRef} pixelSize={44} color="#ffff   " />
      <div id="page-content" className="relative w-full min-h-screen">
        {children}  
      </div>
    </TransitionRouter>
  );
}