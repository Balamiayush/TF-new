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

type PixelData = {
  element: HTMLDivElement;
  order: number;
};

// Config Constants matching the exact "Default" Preset
const CONFIG = {
  pixelSize: 40,
  coverDur: 0.04,
  revealDur: 0.06,
  staggerEach: 0.000257,
  jitter: 0.45,
  color: "#ffffff",
  coverEase: "power1.inOut",
  revealEase: "power3.inOut",
  showOutline: true,
};

const PixelTransition = forwardRef<PixelTransitionRef, PixelTransitionProps>(
  ({ pixelSize = CONFIG.pixelSize, color = CONFIG.color }, ref) => {
    const gridRef = useRef<HTMLDivElement | null>(null);
    const pixelsRef = useRef<PixelData[]>([]);

    const buildGrid = () => {
      const container = gridRef.current;
      if (!container) return;

      container.replaceChildren();
      pixelsRef.current = [];

      const cols = Math.ceil(window.innerWidth / pixelSize);
      const rows = Math.ceil(window.innerHeight / pixelSize);

      container.style.gridTemplateColumns = `repeat(${cols}, ${pixelSize}px)`;
      container.style.gridTemplateRows = `repeat(${rows}, ${pixelSize}px)`;

      const fragment = document.createDocumentFragment();

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const el = document.createElement("div");
          el.style.backgroundColor = color;
          el.style.opacity = "0";
          el.style.transform = "scale(0)";
          el.style.outline = CONFIG.showOutline ? `1px solid ${color}` : "none";
          el.style.willChange = "transform, opacity";

          // Calculate "tl-br" diagonal base order
          const baseOrder = Math.hypot(c, r) / Math.hypot(cols, rows);
          const noise = (Math.random() - 0.5) * CONFIG.jitter;
          const order = Math.max(0, Math.min(1, baseOrder + noise));

          fragment.appendChild(el);
          pixelsRef.current.push({ element: el, order });
        }
      }

      container.appendChild(fragment);
    };

    useEffect(() => {
      buildGrid();
      const handleResize = () => buildGrid();
      window.addEventListener("resize", handleResize);

      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }, [pixelSize, color]);

    useImperativeHandle(ref, () => ({
      cover: () => {
        return new Promise<void>((resolve) => {
          const pixels = pixelsRef.current;
          if (!pixels.length) {
            resolve();
            return;
          }

          const elements = [...pixels]
            .sort((a, b) => a.order - b.order)
            .map((p) => p.element);

          gsap.to(elements, {
            opacity: 1,
            scale: 1,
            duration: CONFIG.coverDur,
            ease: CONFIG.coverEase,
            stagger: {
              each: CONFIG.staggerEach,
              from: "start",
            },
            onComplete: resolve,
          });
        });
      },

      reveal: () => {
        return new Promise<void>((resolve) => {
          const pixels = pixelsRef.current;
          if (!pixels.length) {
            resolve();
            return;
          }

          const elements = [...pixels]
            .sort((a, b) => a.order - b.order)
            .map((p) => p.element);

          gsap.to(elements, {
            opacity: 0,
            scale: 0,
            duration: CONFIG.revealDur,
            ease: CONFIG.revealEase,
            stagger: {
              each: CONFIG.staggerEach,
              from: "start",
            },
            onComplete: resolve,
          });
        });
      },
    }));

    return (
      <div className="pointer-events-none fixed inset-0 z-[99999] h-screen w-screen overflow-hidden">
        <div
          ref={gridRef}
          className="grid h-full w-full content-center justify-center"
        />
      </div>
    );
  }
);

PixelTransition.displayName = "PixelTransition";
export default PixelTransition;