'use client';

import { cn } from '@/app/lib';
import { useEffect, useRef, useState } from 'react';


const ORDERED_DITHER_4X4 = [
  0, 8, 2, 10,
  12, 4, 14, 6,
  3, 11, 1, 9,
  15, 7, 13, 5,
];

/**
 * Convert an image into a PNG data URL rendered as ordered-dither dots.
 * Runs once per image + options change and is cached on the containing component.
 */
function renderImageDither(
  img: HTMLImageElement,
  opts: {
    gridSize: number;
    ditherDotSize: number;
    ditherColor: string;
    invert: boolean;
    maxDim?: number;
  },
): string | null {
  const { gridSize, ditherDotSize, ditherColor, invert, maxDim = 1024 } = opts;
  const naturalW = img.naturalWidth;
  const naturalH = img.naturalHeight;
  if (!naturalW || !naturalH) return null;

  const scale = Math.min(1, maxDim / Math.max(naturalW, naturalH));
  const w = Math.max(1, Math.floor(naturalW * scale));
  const h = Math.max(1, Math.floor(naturalH * scale));

  const src = document.createElement('canvas');
  src.width = w;
  src.height = h;
  const srcCtx = src.getContext('2d');
  if (!srcCtx) return null;
  srcCtx.drawImage(img, 0, 0, w, h);

  let data: Uint8ClampedArray;
  try {
    data = srcCtx.getImageData(0, 0, w, h).data;
  } catch {
    // Cross-origin taint — user should upload via file input to avoid this.
    return null;
  }

  const out = document.createElement('canvas');
  out.width = w;
  out.height = h;
  const outCtx = out.getContext('2d');
  if (!outCtx) return null;
  outCtx.fillStyle = ditherColor;

  const dotSize = Math.max(ditherDotSize, 0.5);
  const step = Math.max(2, Math.floor(gridSize));

  for (let y = Math.floor(step / 2); y < h; y += step) {
    for (let x = Math.floor(step / 2); x < w; x += step) {
      const idx = (y * w + x) * 4;
      const r = data[idx];
      const g = data[idx + 1];
      const b = data[idx + 2];
      const a = data[idx + 3] / 255;
      const brightness = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
      const value = (invert ? brightness : 1 - brightness) * a;
      const column = Math.floor(x / step) & 3;
      const row = Math.floor(y / step) & 3;
      if (value > (ORDERED_DITHER_4X4[row * 4 + column] + 0.5) / 16) {
        outCtx.fillRect(x - dotSize / 2, y - dotSize / 2, dotSize, dotSize);
      }
    }
  }

  return out.toDataURL('image/png');
}

export type DitherHoverBackgroundProps = {
  /** CSS color behind the dither grid. */
  baseColor?: string;
  /** CSS color used by the static grid dots. */
  gridColor?: string;
  /** Space between dots, in CSS pixels. */
  gridSize?: number;
  /** Dot radius, in CSS pixels. */
  dotRadius?: number;
  /** CSS color used for the dithered hover mask. */
  ditherColor?: string;
  /** Maximum dither mask radius as a fraction of the larger side. */
  radiusPercent?: number;
  /** Time for the mask to reach roughly 90% of the pointer target. */
  followDurationMs?: number;
  /** Time for the mask to fade roughly 90% after the pointer leaves. */
  fadeDurationMs?: number;
  /** Peak intensity of the dither mask (0–1). */
  intensity?: number;
  /** Side length of each dither dot in the hover mask, in CSS pixels. */
  ditherDotSize?: number;
  /** Random per-dot offset applied inside each grid cell (0–1). */
  jitter?: number;
  /** Overall opacity of the dither canvas layer (0–1). */
  opacity?: number;
  /** Blob wobble amplitude — how much the shape deviates from a circle (0–0.7). */
  blobWobble?: number;
  /** Number of lobes around the blob perimeter (2–8). */
  blobLobes?: number;
  /** How fast the blob morphs, ms per full cycle. */
  blobMorphMs?: number;
  /** Pointer speed (in px/ms) at which velocity-driven intensity saturates. Set 0 to disable velocity coupling. */
  velocitySaturation?: number;
  /** Time the velocity signal decays back to 0 after the cursor stops, ms. */
  velocityDecayMs?: number;
  /** Image source (URL or data URL). When set, replaces the grid dots with a dithered render of the image. */
  imageSource?: string | null;
  /** Invert the image dither so light pixels become dots (default: false — dark pixels become dots). */
  imageInvert?: boolean;
  /** How the dithered image is sized within the container. */
  imageFit?: 'contain' | 'cover';
  className?: string;
};

/**
 * Decorative ordered-dither cursor background. Place it inside a `relative`
 * container and put foreground content above it with `relative z-10`.
 */
export function DitherHoverBackground({
  baseColor = '#161616',
  gridColor = 'rgba(255, 255, 255, 0.15)',
  gridSize = 10,
  dotRadius = 0.75,
  ditherColor = 'rgba(0, 0, 0, 0.88)',
  radiusPercent = 0.46,
  followDurationMs = 560,
  fadeDurationMs = 420,
  intensity = 1,
  ditherDotSize = 2.5,
  jitter = 0,
  opacity = 1,
  blobWobble = 0.18,
  blobLobes = 4,
  blobMorphMs = 4200,
  velocitySaturation = 1.6,
  velocityDecayMs = 380,
  imageSource = null,
  imageInvert = false,
  imageFit = 'contain',
  className,
}: DitherHoverBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [imageDitherUrl, setImageDitherUrl] = useState<string | null>(null);

  // Compute the dithered image whenever the source or its dither-relevant options change.
  useEffect(() => {
    if (!imageSource) {
      setImageDitherUrl(null);
      return;
    }
    let cancelled = false;
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      if (cancelled) return;
      const url = renderImageDither(img, {
        gridSize,
        ditherDotSize,
        ditherColor,
        invert: imageInvert,
      });
      if (!cancelled) setImageDitherUrl(url);
    };
    img.onerror = () => {
      if (!cancelled) setImageDitherUrl(null);
    };
    img.src = imageSource;
    return () => {
      cancelled = true;
    };
  }, [imageSource, gridSize, ditherDotSize, ditherColor, imageInvert]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = canvas?.parentElement;
    if (!canvas || !container) return;

    const context = canvas.getContext('2d');
    if (!context) return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const state = {
      width: 0,
      height: 0,
      x: 0,
      y: 0,
      targetX: 0,
      targetY: 0,
      intensity: 0,
      pointerInside: false,
      frame: 0,
      previousTime: 0,
      morphPhase: 0,
      // Velocity signal — normalized 0..1 based on recent pointer speed.
      velocity: 0,
      velocityTarget: 0,
      lastMoveTime: 0,
      lastPointerX: 0,
      lastPointerY: 0,
    };

    // Cheap deterministic hash → [-1, 1) so jitter is stable per grid cell.
    const hash = (a: number, b: number) => {
      const n = Math.sin(a * 127.1 + b * 311.7) * 43758.5453;
      return (n - Math.floor(n)) * 2 - 1;
    };

    // Blob radius at a given angle. Sum of two lobe waves gives an organic shape.
    const blobRadius = (angle: number, baseRadius: number) => {
      const primary = Math.sin(angle * blobLobes + state.morphPhase);
      const secondary = Math.sin(angle * (blobLobes + 1) - state.morphPhase * 1.3) * 0.5;
      return baseRadius * (1 + blobWobble * (primary + secondary) * 0.6);
    };

    const draw = () => {
      const { width, height } = state;
      context.clearRect(0, 0, width, height);
      if (state.intensity <= 0.002) return;

      const baseRadius = Math.max(width, height) * radiusPercent;
      const maxRadius = baseRadius * (1 + blobWobble);
      const startX = Math.max(0, state.x - maxRadius);
      const endX = Math.min(width, state.x + maxRadius);
      const startY = Math.max(0, state.y - maxRadius);
      const endY = Math.min(height, state.y + maxRadius);
      context.fillStyle = ditherColor;

      const maskDotSize = Math.max(ditherDotSize, 0.5);
      const jitterAmount = jitter * gridSize * 0.5;
      // Smaller dots read as sparser, so compensate the ordered-dither threshold
      // by boosting perceived intensity as the dot size shrinks below the reference (2.5px).
      const referenceDotSize = 2.5;
      const densityBoost = Math.max(1, referenceDotSize / maskDotSize);
      const effectiveIntensity = state.intensity * intensity * densityBoost;

      for (let y = Math.floor(startY / gridSize) * gridSize + gridSize / 2; y < endY; y += gridSize) {
        for (let x = Math.floor(startX / gridSize) * gridSize + gridSize / 2; x < endX; x += gridSize) {
          const col = Math.floor(x / gridSize);
          const rowIdx = Math.floor(y / gridSize);
          const jx = jitterAmount ? hash(col, rowIdx) * jitterAmount : 0;
          const jy = jitterAmount ? hash(rowIdx, col + 17) * jitterAmount : 0;
          const px = x + jx;
          const py = y + jy;

          const dx = px - state.x;
          const dy = py - state.y;
          const distance = Math.hypot(dx, dy);
          const angle = Math.atan2(dy, dx);
          const localRadius = blobRadius(angle, baseRadius);
          const falloff = Math.max(0, 1 - distance / localRadius) * effectiveIntensity;

          const column = col & 3;
          const row = rowIdx & 3;
          if (falloff > (ORDERED_DITHER_4X4[row * 4 + column] + 0.5) / 16) {
            context.fillRect(px - maskDotSize / 2, py - maskDotSize / 2, maskDotSize, maskDotSize);
          }
        }
      }

    };

    const animate = (time: number) => {
      const elapsed = state.previousTime ? Math.min(time - state.previousTime, 64) : 16;
      state.previousTime = time;
      const followAmount = 1 - Math.pow(0.1, elapsed / followDurationMs);
      const fadeAmount = 1 - Math.pow(0.1, elapsed / fadeDurationMs);
      const velocityAmount = 1 - Math.pow(0.1, elapsed / Math.max(velocityDecayMs, 16));

      state.x += (state.targetX - state.x) * followAmount;
      state.y += (state.targetY - state.y) * followAmount;

      // Velocity target bleeds off between events so a paused cursor drops to 0.
      state.velocityTarget = Math.max(0, state.velocityTarget - elapsed * 0.0025);
      state.velocity += (state.velocityTarget - state.velocity) * velocityAmount;

      // Intensity is driven by velocity when coupling is on, else by presence.
      const targetIntensity = state.pointerInside
        ? velocitySaturation > 0
          ? state.velocity
          : 1
        : 0;
      state.intensity += (targetIntensity - state.intensity) * fadeAmount;
      state.morphPhase += (elapsed / Math.max(blobMorphMs, 100)) * Math.PI * 2;
      draw();

      const settled =
        Math.abs(state.targetX - state.x) < 0.2 &&
        Math.abs(state.targetY - state.y) < 0.2 &&
        state.intensity < 0.004 &&
        state.velocity < 0.004 &&
        !state.pointerInside;
      state.frame = settled ? 0 : window.requestAnimationFrame(animate);
    };

    const startAnimation = () => {
      if (!state.frame && !reducedMotion.matches) {
        state.previousTime = 0;
        state.frame = window.requestAnimationFrame(animate);
      }
    };

    const resize = () => {
      const bounds = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      state.width = bounds.width;
      state.height = bounds.height;
      canvas.width = Math.round(bounds.width * dpr);
      canvas.height = Math.round(bounds.height * dpr);
      context.setTransform(dpr, 0, 0, dpr, 0, 0);

      if (!state.x && !state.y) {
        state.x = state.targetX = bounds.width / 2;
        state.y = state.targetY = bounds.height / 2;
      }
      draw();
    };

    const move = (event: PointerEvent) => {
      const bounds = canvas.getBoundingClientRect();
      const nextX = event.clientX - bounds.left;
      const nextY = event.clientY - bounds.top;
      const now = event.timeStamp || performance.now();

      if (velocitySaturation > 0 && state.lastMoveTime) {
        const dt = Math.max(now - state.lastMoveTime, 1);
        const speed = Math.hypot(nextX - state.lastPointerX, nextY - state.lastPointerY) / dt; // px per ms
        const normalized = Math.min(speed / velocitySaturation, 1);
        // Take the max so a burst of fast motion is not immediately erased.
        state.velocityTarget = Math.max(state.velocityTarget, normalized);
      }

      state.lastMoveTime = now;
      state.lastPointerX = nextX;
      state.lastPointerY = nextY;
      state.targetX = nextX;
      state.targetY = nextY;
      state.pointerInside = true;
      startAnimation();
    };

    const leave = () => {
      state.pointerInside = false;
      state.lastMoveTime = 0;
      state.velocityTarget = 0;
      startAnimation();
    };

    const observer = new ResizeObserver(resize);
    observer.observe(canvas);
    container.addEventListener('pointerenter', move);
    container.addEventListener('pointermove', move);
    container.addEventListener('pointerleave', leave);
    resize();

    return () => {
      observer.disconnect();
      container.removeEventListener('pointerenter', move);
      container.removeEventListener('pointermove', move);
      container.removeEventListener('pointerleave', leave);
      if (state.frame) window.cancelAnimationFrame(state.frame);
    };
  }, [
    ditherColor,
    ditherDotSize,
    dotRadius,
    fadeDurationMs,
    followDurationMs,
    gridSize,
    radiusPercent,
    intensity,
    jitter,
    blobWobble,
    blobLobes,
    blobMorphMs,
    velocitySaturation,
    velocityDecayMs,
  ]);

  const usingImage = Boolean(imageDitherUrl);

  return (
    <>
      <div
        aria-hidden
        className={cn('pointer-events-none absolute inset-0 z-0', className)}
        style={
          usingImage
            ? {
                backgroundColor: baseColor,
                backgroundImage: `url(${imageDitherUrl})`,
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
                backgroundSize: imageFit,
                opacity,
              }
            : {
                backgroundColor: baseColor,
                backgroundImage: `radial-gradient(${gridColor} ${dotRadius}px, transparent ${dotRadius}px)`,
                backgroundSize: `${gridSize}px ${gridSize}px`,
                opacity,
              }
        }
      />
      <canvas
        ref={canvasRef}
        aria-hidden
        className={cn('pointer-events-none absolute inset-0  h-full w-full', className)}
        style={{ opacity }}
      />
    </>
  );
}
