import { type ReactNode } from "react";

import { tv } from "tailwind-variants";

type LabelProps = {
  as: "Label L" | "Label M";
  weight?: "regular" | "medium";
  children: ReactNode;
  className?: string;
};

const labelClasses = tv({
  base: "text-black",
  variants: {
    as: {
      "Label L": "text-[14px] leading-[140%] md:text-[16px] md:leading-[150%]",
      "Label M":
        "text-[13px] leading-[140%] md:text-[14px] md:leading-[140%] xl:leading-[150%]",
    },
    weight: {
      regular: "font-regular",
      medium: "font-medium",
    },
    defaultVariants: {
      as: "Label L",
      weight: "regular",
    },
  },
});

export default function Label({
  as,
  weight,
  children,
  className,
  ...otherProps
}: LabelProps) {
  return (
    <p className={labelClasses({ as, weight, className })} {...otherProps}>
      {children}
    </p>
  );
}
