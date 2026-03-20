import { type ReactNode } from "react";

import { tv } from "tailwind-variants";

type BodyProps = {
  as: "Body L" | "Body M" | "Body S";
  weight?: "regular" | "medium";
  children: ReactNode;
  className?: string;
};

const bodyClasses = tv({
  base: "text-black",
  variants: {
    as: {
      "Body L":
        "text-[14px] leading-[160%] tracking-[-0.15px] md:text-[16px] md:leading-[150%] md:tracking-[-0.2px] xl:text-[18px] xl:leading-[150%] xl:tracking-[-0.3px]",
      "Body M":
        "text-[13px] leading-[150%] tracking-[-0.1px] md:text-[14px] md:leading-[160%] md:tracking-[-0.15px] xl:text-[16px] xl:leading-[150%] xl:tracking-[-0.18px]",
      "Body S":
        "text-[12px] leading-[150%] tracking-[-0.08px] md:text-[13px] md:leading-[160%] md:tracking-[-0.1px] xl:text-[14px] xl:leading-[150%] xl:tracking-[-0.15px]",
    },
    weight: {
      regular: "font-regular",
      medium: "font-medium",
    },
    defaultVariants: {
      as: "Body L",
      weight: "regular",
    },
  },
});

export default function Body({
  as,
  weight = "regular",
  children,
  className,
  ...otherProps
}: BodyProps) {
  return (
    <p className={bodyClasses({ as, weight, className })} {...otherProps}>
      {children}
    </p>
  );
}
