import Link from "next/link";
import { ComponentPropsWithoutRef, PropsWithChildren } from "react";
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
      ghost: "bg-transparent text-slate-900 ",
      tertiary: "bg-[#FAFAFA] text-black group-hover:bg-alpha-dark-00 group-hover:text-white",
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

type BaseProps = {
  variant?: ButtonVariants["variant"];
  showArrow?: boolean;
  hasRightIcon?: boolean;
  link?: string;
} & PropsWithChildren;

// Omit 'href' from Next.js Link props to prevent duplicate declaration
type AnchorProps = Omit<ComponentPropsWithoutRef<typeof Link>, "href"> & {
  href?: string;
};

type ButtonProps = BaseProps &
  Omit<ComponentPropsWithoutRef<"button">, "href"> &
  AnchorProps;

export default function Button({
  variant = "primary",
  showArrow = false,
  hasRightIcon,
  className,
  children,
  href,
  link,
  ...otherProps
}: ButtonProps) {
  const isRightIconActive = hasRightIcon ?? showArrow;
  const targetUrl = href || link;

  const combinedClasses = buttonClasses({
    variant,
    hasRightIcon: isRightIconActive,
    className,
  });

  const content = (
    <>
      <span className="inline-flex items-center gap-2.5 whitespace-nowrap">
        {children}
      </span>
      {showArrow && <DropdownArrow />}
    </>
  );

  if (targetUrl) {
    return (
      <Link
        href={targetUrl}
        className={combinedClasses}
        {...(otherProps as Omit<ComponentPropsWithoutRef<typeof Link>, "href">)}
      >
        {content}
      </Link>
    );
  }

  return (
    <button
      type="button"
      className={combinedClasses}
      {...(otherProps as ComponentPropsWithoutRef<"button">)}
    >
      {content}
    </button>
  );
}