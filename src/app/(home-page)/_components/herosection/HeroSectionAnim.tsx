"use client";

import Image from "next/image";
import React, { useRef, useState } from "react";
import { Fingerprint } from "lucide-react";
import { motion, PanInfo } from "framer-motion";

export function FingerprintCard() {
  const globeRings = [
    { w: 302, h: 302 },
    { w: 302, h: 244.5 },
    { w: 302, h: 180.79 },
    { w: 302, h: 132.17 },
    { w: 302, h: 78.75 },
    { w: 302, h: 41.09 },
  ];
  const eyeRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [pupilOffset, setPupilOffset] = useState({ x: 0, y: 0 });
  const [position, setPosition] = useState<"right" | "left">("right");

  const followPointer = (event: React.PointerEvent<HTMLDivElement>) => {
    const eyeBounds = eyeRef.current?.getBoundingClientRect();
    if (!eyeBounds) return;

    const horizontal =
      (event.clientX - (eyeBounds.left + eyeBounds.width / 2)) /
      (eyeBounds.width / 2);
    const vertical =
      (event.clientY - (eyeBounds.top + eyeBounds.height / 2)) /
      (eyeBounds.height / 2);
    const distance = Math.hypot(horizontal, vertical);
    const limit = distance > 1 ? 1 / distance : 1;

    setPupilOffset({
      x: horizontal * limit * 14,
      y: vertical * limit * 14,
    });
  };

  const handleDragEnd = (_: any, info: PanInfo) => {
    // If dragged left past -30px or swiped left quickly, snap to the left side
    if (info.offset.x < -30 || info.velocity.x < -200) {
      setPosition("left");
    } 
    // If dragged right past 30px or swiped right quickly, snap to the right side
    else if (info.offset.x > 30 || info.velocity.x > 200) {
      setPosition("right");
    }
  };

  return (
    <div
      className="relative h-[420px] overflow-hidden rounded-lg border border-slate-100 bg-white lg:h-[518px]"
      onPointerMove={followPointer}
      onPointerLeave={() => setPupilOffset({ x: 0, y: 0 })}
    >
      <img
        src="/images/hero/fingerprint-globe.svg"
        alt=""
        aria-hidden
        className="pointer-events-none absolute bottom-[-41px] left-1/2 h-[217px] w-[555%] max-w-none -translate-x-1/2"
      />
      <img
        src="/images/hero/fingerprint-bottom.svg"
        alt=""
        aria-hidden
        className="pointer-events-none absolute top-[59.14%] left-1/2 h-auto w-[555%] max-w-none -translate-x-1/2 opacity-90"
      />

      <div className="pointer-events-none absolute top-[9px] left-1/2 h-[302px] w-[302px] -translate-x-1/2">
        {globeRings.map(({ w, h }, i) => (
          <div
            key={i}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-[50%] border border-slate-200/70"
            style={{ width: `${w}px`, height: `${h}px` }}
          />
        ))}
        <div className="absolute top-1/2 left-1/2 h-[60px] w-[260px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-r from-transparent via-[#e18cff]/70 to-transparent blur-md" />
        <div
          ref={eyeRef}
          className="absolute top-1/2 left-1/2 flex h-[60px] w-[60px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-[#E18CFF] shadow-[0_0_28px_6px_rgba(225,140,255,0.55)]"
        >
          <span
            aria-hidden
            className="h-[24px] w-[24px] rounded-full bg-[#2d1440] shadow-[0_1px_4px_rgba(45,20,64,0.35)] transition-transform duration-100 ease-out motion-reduce:transition-none"
            style={{
              transform: `translate3d(${pupilOffset.x}px, ${pupilOffset.y}px, 0)`,
            }}
          >
            <span className="absolute top-[5px] left-[5px] h-[6px] w-[6px] rounded-full bg-white/90" />
          </span>
        </div>
      </div>

      <div
        ref={trackRef}
        className="absolute bottom-6 left-1/2 flex h-[109px] w-[306px] -translate-x-1/2 items-center justify-end rounded-full border-[1.2px] border-slate-200 bg-white/70 py-1.5 pr-[7px] pl-[196px] backdrop-blur-xl"
      >
        <motion.div
          drag="x"
          dragConstraints={{ left: -189, right: 0 }}
          dragElastic={0.05}
          animate={{ x: position === "left" ? -189 : 0 }}
          onDragEnd={handleDragEnd}
          transition={{
            type: "spring",
            stiffness: 500,
            damping: 30,
          }}
          className="flex h-[97px] w-[127px] items-center justify-center rounded-full border border-slate-200 bg-white cursor-grab active:cursor-grabbing select-none touch-none"
        >
          <Fingerprint className="h-16 w-16 text-slate-700 pointer-events-none" strokeWidth={1.5} />
        </motion.div>
      </div>
    </div>
  );
}