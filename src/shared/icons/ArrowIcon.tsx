import type { SVGProps } from "react";
    
export default function ArrowIcon({...props}: SVGProps<SVGSVGElement>) {
  return (
    <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    fill="none"
    {...props}
    viewBox="0 0 16 16"
  >
    <path
      stroke="#020617"
      strokeLinecap="square"
      strokeWidth="1.5"
      d="M9.333 3.834 13.5 8l-4.167 4.167M13 8H2.5"
    ></path>
  </svg>
  )
}
