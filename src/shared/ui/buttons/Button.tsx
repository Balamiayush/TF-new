import { ComponentPropsWithoutRef, PropsWithChildren } from "react";
import { tv } from "tailwind-variants";

import { DropdownArrow } from "@/shared/icons/DropdownArrow";

type ButtonProps = {
  variant?: "primary" | "secondary";
  showArrow?: boolean;
} & PropsWithChildren &
  ComponentPropsWithoutRef<"button">;

const buttonClasses = tv({
  base: [
    "inline-flex items-center justify-center gap-2",
    " px-6 py-3",
    "text-sm font-medium leading-none",
    "transition-all duration-200",
    "cursor-pointer",
    "disabled:pointer-events-none disabled:opacity-50",
  ],
  variants: {
    variant: {
      primary:
        "bg-[#3B82F6] text-slate-50 hover:bg-[#2563EB]",
      secondary:
        "bg-slate-50 text-gray-900 hover:bg-slate-100",
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
      className={buttonClasses({
        variant,
        className,
      })}
      {...otherProps}
    >
      <span>{children}</span>

      {showArrow && <DropdownArrow />}
    </button>
  );
}