"use client";

import React, { useEffect, useRef, useImperativeHandle, forwardRef } from "react";
import gsap from "gsap";

export interface PixelTransitionRef {
  cover: () => Promise<void>;
  reveal: () => Promise<void>;
}

interface PixelTransitionProps {
  pixelSize?: number;
  color?: string;
}

interface PixelData {
  element: HTMLDivElement;
  order: number;
}

const PixelTransition = forwardRef<PixelTransitionRef, PixelTransitionProps>(
  ({ pixelSize = 36, color = "#2563eb" }, ref) => {
    const gridRef = useRef<HTMLDivElement | null>(null);
    const pixelDataRef = useRef<PixelData[]>([]);

    const buildGrid = () => {
      if (!gridRef.current) return;

      gridRef.current.innerHTML = "";
      pixelDataRef.current = [];

      const width = window.innerWidth;
      const height = window.innerHeight;

      const cols = Math.ceil(width / pixelSize);
      const rows = Math.ceil(height / pixelSize);

      gridRef.current.style.gridTemplateColumns = `repeat(${cols}, ${pixelSize}px)`;
      gridRef.current.style.gridTemplateRows = `repeat(${rows}, ${pixelSize}px)`;

      const fragment = document.createDocumentFragment();
      const maxDistance = Math.sqrt(cols * cols + rows * rows);

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const pixel = document.createElement("div");
          pixel.style.backgroundColor = color;
          pixel.style.opacity = "0";
          pixel.style.transform = "scale(0)";
          pixel.style.outline = `1px solid ${color}`;
          pixel.style.willChange = "transform, opacity";

          // Calculate normalized diagonal distance (0 to 1) from Top-Left
          const distance = Math.sqrt(c * c + r * r) / maxDistance;
          
          // Add random jitter noise (-0.25 to +0.25) to break strict lines into scattered pixels
          const noise = (Math.random() - 0.5) * 0.5;
          const order = Math.max(0, distance + noise);

          fragment.appendChild(pixel);
          pixelDataRef.current.push({ element: pixel, order });
        }
      }

      gridRef.current.appendChild(fragment);
    };

    useEffect(() => {
      buildGrid();
      const handleResize = () => buildGrid();
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }, [pixelSize, color]);

    useImperativeHandle(ref, () => ({
      cover: () => {
        return new Promise<void>((resolve) => {
          const items = pixelDataRef.current;
          if (!items.length) {
            resolve();
            return;
          }

          const sorted = [...items].sort((a, b) => a.order - b.order);
          const elements = sorted.map((item) => item.element);

          gsap.to(elements, {
            opacity: 1,
            scale: 1.05,
            duration: 0.2,
            ease: "power1.inOut",
            stagger: 0.0012, 
            onComplete: resolve,
          });
        });
      },

      reveal: () => {
        return new Promise<void>((resolve) => {
          const items = pixelDataRef.current;
          if (!items.length) {
            resolve();
            return;
          }

          // Keep same order so the clear wave follows the cover direction
          const sorted = [...items].sort((a, b) =>   b.order-a.order);
          const elements = sorted.map((item) => item.element);

          gsap.to(elements, {
            opacity: 0,
            scale: 0,
            duration: 0.2,
            ease: "power2.inOut",
            stagger: 0.0012,
            onComplete: resolve,
          });
        });
      },
    }));

    return (
      <div className="pointer-events-none fixed inset-0 z-[99999] h-screen w-screen overflow-hidden">
        <div ref={gridRef} className="grid h-full w-full content-center justify-center" />
      </div>
    );
  }
);

PixelTransition.displayName = "PixelTransition";
export default PixelTransition;