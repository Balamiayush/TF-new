import { ComponentPropsWithoutRef, PropsWithChildren } from "react";

import { tv } from "tailwind-variants";

type ButtonProps = {
  variant?: "primary";
} & PropsWithChildren &
  ComponentPropsWithoutRef<"button">;

const buttonClasses = tv({
  base: "",
  variants: {
    variant: {
      primary: "",
    },
  },
  defaultVariants: {
    variant: "primary",
  },
});

export default function Button({
  variant = "primary",
  className,
  children,
  ...otherProps
}: ButtonProps) {
  return (
    <button className={buttonClasses({ variant, className })} {...otherProps}>
      {children}
    </button>
  );
}
