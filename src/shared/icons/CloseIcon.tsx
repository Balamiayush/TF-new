import * as React from "react";

const CloseIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="18"
    height="18"
    fill="none"
    viewBox="0 0 18 18"
    {...props}
  >
    <path
      stroke="#000"
      strokeLinecap="square"
      strokeWidth="1.5"
      d="m3.563 3.563 10.875 10.875m0-10.875L3.563 14.438"
    />
  </svg>
);

export default CloseIcon;