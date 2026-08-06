"use client";

import { useState } from "react";
// import { ChevronDown } from 'lucide-react';

export type DitherSettings = {
  gridSize: number;
  dotRadius: number;
  radiusPercent: number;
  followDurationMs: number;
  fadeDurationMs: number;
  gridColor: string; // hex
  gridAlpha: number; // 0..1
  ditherColor: string; // hex
  ditherAlpha: number; // 0..1
  ditherDotSize: number; // px
  intensity: number; // 0..1
  jitter: number; // 0..1
  opacity: number; // 0..1
  blobWobble: number; // 0..0.7
  blobLobes: number; // 2..8
  blobMorphMs: number;
  velocitySaturation: number; // px/ms
  velocityDecayMs: number;
  imageSource: string | null; // data URL
  imageInvert: boolean;
  imageFit: "contain" | "cover";
};

export const DEFAULT_DITHER_SETTINGS: DitherSettings = {
  gridSize: 9,
  dotRadius: 0.9,
  radiusPercent: 0.13,
  followDurationMs: 320,
  fadeDurationMs: 100,
  gridColor: "#a3bfff",
  gridAlpha: 0.12,
  ditherColor: "#a2bdfb",
  ditherAlpha: 0.27,
  ditherDotSize: 3.4,
  intensity: 1,
  jitter: 0.2,
  opacity: 1,
  blobWobble: 0.26,
  blobLobes: 3,
  blobMorphMs: 4200,
  velocitySaturation: 1.6,
  velocityDecayMs: 380,
  imageSource: null,
  imageInvert: false,
  imageFit: "contain",
};

/** Convert a hex color + alpha (0..1) to `rgba()`. */
export function hexToRgba(hex: string, alpha: number): string {
  const clean = hex.replace("#", "");
  const full =
    clean.length === 3
      ? clean
          .split("")
          .map((c) => c + c)
          .join("")
      : clean;
  const r = parseInt(full.slice(0, 2), 16);
  const g = parseInt(full.slice(2, 4), 16);
  const b = parseInt(full.slice(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

type DitherControlsProps = {
  value: DitherSettings;
  onChange: (next: DitherSettings) => void;
};

export function DitherControls({ value, onChange }: DitherControlsProps) {
  const [open, setOpen] = useState(false);

  const update = <K extends keyof DitherSettings>(
    key: K,
    next: DitherSettings[K],
  ) => onChange({ ...value, [key]: next });

  return (
    <div className="font-inter fixed right-4 hidden bottom-4 z-50 w-[300px] text-[12px] text-slate-900">
      <div className="max-h-[calc(100vh-2rem)] overflow-hidden rounded-lg border border-slate-200 bg-white/95 shadow-lg backdrop-blur-md">
        <button
          type="button"
          onClick={() => setOpen((prev) => !prev)}
          className="flex w-full items-center justify-between gap-2 border-b border-slate-100 px-3 py-2 text-left"
        >
          <span className="font-medium">Dither controls</span>
        </button>

        {open && (
          <div className="max-h-[70vh] overflow-y-auto px-3 py-3">
            <Section title="Image dither">
              <ImageDitherRow
                imageSource={value.imageSource}
                invert={value.imageInvert}
                fit={value.imageFit}
                onImage={(src) => update("imageSource", src)}
                onInvert={(next) => update("imageInvert", next)}
                onFit={(next) => update("imageFit", next)}
              />
            </Section>

            <Section title="Intensity & opacity">
              <Slider
                label="Intensity"
                min={0}
                max={1}
                step={0.01}
                value={value.intensity}
                onChange={(v) => update("intensity", v)}
                display={(v) => v.toFixed(2)}
              />
              <Slider
                label="Layer opacity"
                min={0}
                max={1}
                step={0.01}
                value={value.opacity}
                onChange={(v) => update("opacity", v)}
                display={(v) => v.toFixed(2)}
              />
              <Slider
                label="Jitter"
                min={0}
                max={1}
                step={0.01}
                value={value.jitter}
                onChange={(v) => update("jitter", v)}
                display={(v) => v.toFixed(2)}
              />
            </Section>

            <Section title="Velocity">
              <Slider
                label="Speed to saturate"
                suffix="px/ms"
                min={0}
                max={5}
                step={0.05}
                value={value.velocitySaturation}
                onChange={(v) => update("velocitySaturation", v)}
                display={(v) => v.toFixed(2)}
              />
              <Slider
                label="Speed decay"
                suffix="ms"
                min={80}
                max={2000}
                step={20}
                value={value.velocityDecayMs}
                onChange={(v) => update("velocityDecayMs", v)}
              />
            </Section>

            <Section title="Blob shape">
              <Slider
                label="Wobble"
                min={0}
                max={0.7}
                step={0.01}
                value={value.blobWobble}
                onChange={(v) => update("blobWobble", v)}
                display={(v) => v.toFixed(2)}
              />
              <Slider
                label="Lobes"
                min={2}
                max={8}
                step={1}
                value={value.blobLobes}
                onChange={(v) => update("blobLobes", v)}
              />
              <Slider
                label="Morph speed"
                suffix="ms"
                min={800}
                max={12000}
                step={200}
                value={value.blobMorphMs}
                onChange={(v) => update("blobMorphMs", v)}
              />
              <Slider
                label="Hover size"
                suffix="%"
                min={0.1}
                max={1}
                step={0.01}
                value={value.radiusPercent}
                onChange={(v) => update("radiusPercent", v)}
                display={(v) => Math.round(v * 100).toString()}
              />
            </Section>

            <Section title="Grid">
              <ColorRow
                label="Grid color"
                color={value.gridColor}
                alpha={value.gridAlpha}
                onColor={(c) => update("gridColor", c)}
                onAlpha={(a) => update("gridAlpha", a)}
              />
              <Slider
                label="Grid size"
                suffix="px"
                min={4}
                max={40}
                step={1}
                value={value.gridSize}
                onChange={(v) => update("gridSize", v)}
              />
              <Slider
                label="Dot radius"
                suffix="px"
                min={0.25}
                max={4}
                step={0.05}
                value={value.dotRadius}
                onChange={(v) => update("dotRadius", v)}
              />
            </Section>

            <Section title="Dither">
              <ColorRow
                label="Dither color"
                color={value.ditherColor}
                alpha={value.ditherAlpha}
                onColor={(c) => update("ditherColor", c)}
                onAlpha={(a) => update("ditherAlpha", a)}
              />
              <Slider
                label="Dither dot size"
                suffix="px"
                min={0.5}
                max={12}
                step={0.1}
                value={value.ditherDotSize}
                onChange={(v) => update("ditherDotSize", v)}
                display={(v) => v.toFixed(1)}
              />
              <Slider
                label="Follow speed"
                suffix="ms"
                min={80}
                max={2000}
                step={20}
                value={value.followDurationMs}
                onChange={(v) => update("followDurationMs", v)}
              />
              <Slider
                label="Fade speed"
                suffix="ms"
                min={80}
                max={2000}
                step={20}
                value={value.fadeDurationMs}
                onChange={(v) => update("fadeDurationMs", v)}
              />
            </Section>

            <button
              type="button"
              onClick={() => onChange(DEFAULT_DITHER_SETTINGS)}
              className="mt-2 w-full rounded border border-slate-200 bg-white px-2 py-1.5 text-[11px] font-medium text-slate-700 transition-colors hover:bg-slate-50"
            >
              Reset to defaults
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mb-3 border-b border-slate-100 pb-3 last:mb-0 last:border-b-0 last:pb-0">
      <p className="mb-2 text-[10px] font-semibold tracking-wide text-slate-500 uppercase">
        {title}
      </p>
      <div className="flex flex-col gap-2.5">{children}</div>
    </div>
  );
}

type SliderProps = {
  label: string;
  suffix?: string;
  min: number;
  max: number;
  step: number;
  value: number;
  onChange: (value: number) => void;
  display?: (value: number) => string;
};

function Slider({
  label,
  suffix = "",
  min,
  max,
  step,
  value,
  onChange,
  display,
}: SliderProps) {
  const shown = display ? display(value) : value.toString();
  return (
    <label className="flex flex-col gap-1">
      <span className="flex items-center justify-between text-[11px] text-slate-600">
        <span>{label}</span>
        <span className="text-slate-900 tabular-nums">
          {shown}
          {suffix}
        </span>
      </span>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
        className="h-1 w-full cursor-pointer appearance-none rounded-full bg-slate-200 accent-[#0088d4]"
      />
    </label>
  );
}

type ImageDitherRowProps = {
  imageSource: string | null;
  invert: boolean;
  fit: "contain" | "cover";
  onImage: (src: string | null) => void;
  onInvert: (next: boolean) => void;
  onFit: (next: "contain" | "cover") => void;
};

function ImageDitherRow({
  imageSource,
  invert,
  fit,
  onImage,
  onInvert,
  onFit,
}: ImageDitherRowProps) {
  return (
    <div className="flex flex-col gap-2">
      <label className="inline-flex cursor-pointer items-center justify-center rounded border border-slate-200 bg-white px-2 py-1.5 text-[11px] font-medium text-slate-700 transition-colors hover:bg-slate-50">
        <input
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(event) => {
            const file = event.target.files?.[0];
            if (!file) return;
            const reader = new FileReader();
            reader.onload = () => {
              if (typeof reader.result === "string") onImage(reader.result);
            };
            reader.readAsDataURL(file);
            // Reset input so re-uploading the same file re-fires onChange.
            event.target.value = "";
          }}
        />
        {imageSource ? "Replace image…" : "Upload PNG/JPG…"}
      </label>

      {imageSource && (
        <>
          <div className="flex items-center gap-2">
            <div
              aria-hidden
              className="h-10 w-10 shrink-0 rounded border border-slate-200 bg-slate-100"
              style={{
                backgroundImage: `url(${imageSource})`,
                backgroundSize: "contain",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
              }}
            />
            <div className="flex flex-1 flex-col gap-1">
              <label className="flex items-center gap-2 text-[11px] text-slate-700">
                <input
                  type="checkbox"
                  checked={invert}
                  onChange={(event) => onInvert(event.target.checked)}
                  className="h-3.5 w-3.5 accent-[#0088d4]"
                />
                Invert (dots on light)
              </label>
              <label className="flex items-center gap-2 text-[11px] text-slate-700">
                <span>Fit</span>
                <select
                  value={fit}
                  onChange={(event) =>
                    onFit(event.target.value as "contain" | "cover")
                  }
                  className="flex-1 rounded border border-slate-200 bg-white px-1 py-0.5 text-[11px] text-slate-900"
                >
                  <option value="contain">Contain</option>
                  <option value="cover">Cover</option>
                </select>
              </label>
            </div>
          </div>
          <button
            type="button"
            onClick={() => onImage(null)}
            className="rounded border border-slate-200 bg-white px-2 py-1 text-[11px] font-medium text-slate-600 transition-colors hover:bg-slate-50"
          >
            Clear image
          </button>
        </>
      )}
    </div>
  );
}

type ColorRowProps = {
  label: string;
  color: string;
  alpha: number;
  onColor: (hex: string) => void;
  onAlpha: (alpha: number) => void;
};

function ColorRow({ label, color, alpha, onColor, onAlpha }: ColorRowProps) {
  return (
    <div className="flex flex-col gap-1">
      <span className="flex items-center justify-between text-[11px] text-slate-600">
        <span>{label}</span>
        <span className="text-slate-900 tabular-nums">{`${color} · ${alpha.toFixed(2)}`}</span>
      </span>
      <div className="flex items-center gap-2">
        <input
          type="color"
          value={color}
          onChange={(event) => onColor(event.target.value)}
          className="h-7 w-9 cursor-pointer rounded border border-slate-200 bg-white p-0"
        />
        <input
          type="range"
          min={0}
          max={1}
          step={0.01}
          value={alpha}
          onChange={(event) => onAlpha(Number(event.target.value))}
          className="h-1 flex-1 cursor-pointer appearance-none rounded-full bg-slate-200 accent-[#0088d4]"
        />
      </div>
    </div>
  );
}
