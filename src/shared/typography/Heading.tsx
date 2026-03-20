import { type ReactNode } from "react";

import { tv } from "tailwind-variants";

type HeadingProps = {
  as: "h1" | "h2" | "h3" | "h4";
  weight?: "regular" | "semibold";
  children: ReactNode;
  className?: string;
};

const headingClasses = tv({
  base: "text-black",
  variants: {
    as: {
      h1: "text-[24px] leading-[140%] tracking-[-0.6px] md:text-[28px] md:tracking-[-0.8px] xl:text-[32px] xl:leading-[120%] xl:tracking-[-1px]",
      h2: "text-[20px] leading-[140%] tracking-[-0.4px] md:text-[24px] md:leading-[130%] md:tracking-[-0.6px] xl:text-[28px] xl:leading-[120%] xl:tracking-[-0.8px]",
      h3: "text-[18px] leading-[140%] tracking-[-0.3px] md:text-[20px] md:tracking-[-0.4px] xl:text-[24px] xl:leading-[130%] xl:tracking-[-0.6px]",
      h4: "text-[16px] leading-[150%] tracking-[-0.2px] md:text-[18px] md:leading-[140%] md:tracking-[-0.3px] xl:text-[20px] xl:leading-[130%] xl:tracking-[-0.4px]",
    },
    weight: {
      regular: "font-regular",
      semibold: "font-semibold",
    },
    defaultVariants: {
      as: "h1",
      weight: "regular",
    },
  },
});

export default function Heading({
  as,
  weight = "regular",
  children,
  className,
  ...otherProps
}: HeadingProps) {
  const Component = as;
  return (
    <Component
      className={headingClasses({ as, weight, className })}
      {...otherProps}
    >
      {children}
    </Component>
  );
}
