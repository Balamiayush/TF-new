import { type ReactNode } from "react";

type LayoutWrapperProps = {
  children: ReactNode;
};

export default function LayoutWrapper({ children }: LayoutWrapperProps) {
  return (
    <div className="mx-auto w-full max-w-[1440px] max-xl:px-8 max-md:px-4">
      {children}
    </div>
  );
}
