import { type ReactNode } from "react";

import { tv } from "tailwind-variants";

type DisplayProps = {
  as: "Display 1" | "Display 2";
  weight?: "regular" | "medium" | "semibold" | "bold";
  children: ReactNode;
  className?: string;
};

const displayClasses = tv({
  base: "text-black",
  variants: {
    as: {
      "Display 1":
        "text-[32px] leading-[120%] tracking-[-1.5px] md:text-[42px] md:leading-[110%] md:tracking-[-2px] xl:text-[56px] xl:tracking-[-3px]",
      "Display 2":
        "text-[28px] leading-[120%] tracking-[-1.2px] md:text-[36px] md:tracking-[-2px] xl:text-[48px] xl:tracking-[-2.5px]",
    },
    weight: {
      regular: "font-regular",
      medium: "font-medium",
      semibold: "font-semibold",
      bold: "font-bold",
    },
    defaultVariants: {
      as: "Display 1",
      weight: "regular",
    },
  },
});

export default function Display({
  as,
  weight = "regular",
  className,
  children,
  ...otherProps
}: DisplayProps) {
  return (
    <p className={displayClasses({ as, weight, className })} {...otherProps}>
      {children}
    </p>
  );
}
