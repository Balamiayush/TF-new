import { type ReactNode } from "react";

import { tv } from "tailwind-variants";

type CaptionProps = {
  as: "Caption L" | "Caption M";
  weight?: "regular" | "medium";
  children: ReactNode;
  className?: string;
};

const captionClasses = tv({
  base: "text-black",
  variants: {
    as: {
      "Caption L":
        "text-[10px] leading-[140%] md:text-[11px] md:leading-[150%] xl:text-[12px] xl:leading-[140%]",
      "Caption M":
        "text-[10px] leading-[140%] md:text-[11px] md:leading-[150%] xl:text-[12px] xl:leading-[140%]",
    },
    weight: {
      regular: "font-normal",
      medium: "font-medium",
    },
  },
  defaultVariants: {
    as: "Caption L",
    weight: "regular",
  },
});

export default function Caption({
  as,
  weight = "regular",
  children,
  className,
  ...otherProps
}: CaptionProps) {
  return (
    <p className={captionClasses({ as, weight, className })} {...otherProps}>
      {children}
    </p>
  );
}
