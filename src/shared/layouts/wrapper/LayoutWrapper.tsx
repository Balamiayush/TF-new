import { type ReactNode } from "react";

type LayoutWrapperProps = {
  children: ReactNode;
  className?: string;
};

export default function LayoutWrapper({
  children,
  className,
}: LayoutWrapperProps) {
  return (
    <div
      className={`mx-auto w-full max-w-[1376px] max-xl:px-8 max-md:px-4 ${className}`}
    >
      {children}
    </div>
  );
}
