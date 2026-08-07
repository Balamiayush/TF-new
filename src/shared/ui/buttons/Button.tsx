import { ComponentPropsWithoutRef, PropsWithChildren } from "react";
import { tv } from "tailwind-variants";

import { DropdownArrow } from "@/shared/icons/DropdownArrow";

type ButtonProps = {
  variant?: "primary" | "secondary" | "contactus";
  showArrow?: boolean;
} & PropsWithChildren &
  ComponentPropsWithoutRef<"button">;

const buttonClasses = tv({
  base: [
    "inline-flex items-center justify-center gap-2.5 px-6 py-3 text-sm h-10",
    "transition-all duration-200",
    "cursor-pointer font-medium",
    "disabled:pointer-events-none disabled:opacity-50",
  ],
  variants: {
    variant: {
      primary: "bg-blue-500 text-slate-50 hover:bg-blue-500  leading-none ",
      secondary: "bg-slate-50 text-gray-900 hover:bg-slate-100  leading-none ",
      contactus: "  bg-white/60 text-[#1A1A1ACC] ",
    },
  },
  defaultVariants: {
    variant: "primary",
  },
});

export default function Button({
  variant = "primary",
  showArrow = false,
  className,
  children,
  ...otherProps
}: ButtonProps) {
  return (
    <button
      type="button"
      className={buttonClasses({
        variant,
        className,
      })}
      {...otherProps}
    >
      <span className="inline-flex items-center gap-2.5 whitespace-nowrap">
        {children}
      </span>

      {showArrow && <DropdownArrow />}
    </button>
  );
}
