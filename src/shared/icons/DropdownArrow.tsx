import * as React from "react";
import type { SVGProps } from "react";

export function DropdownArrow(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="8"
      height="5"
      fill="none"
      viewBox="0 0 8 5"
    >
      <path
        stroke="#0F172A"
        strokeLinecap="square"
        strokeWidth="1.5"
        d="M1.06 1.06 3.727 3.727 6.394 1.06"
      />
    </svg>
  );
}