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
        "text-[32px] leading-[120%] tracking-[-1.5px] md:text-[42px] md:leading-[110%] xl:text-[56px]",
      "Display 2": "text-[28px] md:text-[36px] xl:text-[48px] leading-[120%]",
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
