import { ComponentPropsWithoutRef, PropsWithChildren, ReactNode } from "react";
import { tv, type VariantProps } from "tailwind-variants";

import { DropdownArrow } from "@/shared/icons/DropdownArrow";

const buttonClasses = tv({
  base: [
    "inline-flex items-center justify-center",
    "h-10 min-h-10 opacity-100 rotate-0",
    "py-3 pl-5 gap-2.5",
    "text-sm font-medium leading-none",
    "transition-all duration-200 cursor-pointer",
    "disabled:pointer-events-none disabled:opacity-50",
  ],
  variants: {
    variant: {
      primary: " bg-blue-500 text-slate-50 hover:bg-blue-600",
      secondary: " bg-alpha-light-00 text-gray-900 ",
      contactus: " bg-white/60 text-[#1A1A1ACC]",
    },
    hasRightIcon: {
      true: "pr-[6px]", 
      false: "pr-5",
    },
  },
  defaultVariants: {
    variant: "primary",
    hasRightIcon: false,
  },
});

type ButtonVariants = VariantProps<typeof buttonClasses>;

type ButtonProps = {
  variant?: ButtonVariants["variant"];
  showArrow?: boolean;
  hasRightIcon?: boolean; 
} & PropsWithChildren &
  ComponentPropsWithoutRef<"button">;

export default function Button({
  variant = "primary",
  showArrow = false,
  hasRightIcon,
  className,
  children,
  ...otherProps
}: ButtonProps) {
  const isRightIconActive = hasRightIcon ?? showArrow;

  return (
    <button
      type="button"
      className={buttonClasses({
        variant,
        hasRightIcon: isRightIconActive,
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