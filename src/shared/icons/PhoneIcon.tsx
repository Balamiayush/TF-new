
import type { SVGProps } from "react";

export default function PhoneIcon({...props}: SVGProps<SVGSVGElement>) {
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
      strokeWidth="1.5"
      d="M6.833 5.333 6 2.5H2.501l-.001.167c0 1.978.53 3.832 1.456 5.428.949 1.636 2.313 3 3.949 3.949a10.8 10.8 0 0 0 5.428 1.456h.167V10l-2.833-.833-1.206 1.255A8.7 8.7 0 0 1 5.578 6.54z"
    ></path>
  </svg>
  )
}
